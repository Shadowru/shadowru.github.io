import { CreateMesh } from './CreateMesh.js';
import { WindowDepth } from './WallDepths/WindowDepth.js';
import { SolidPart } from './WallParts/SolidPart.js';
import { DoorPart } from './WallParts/DoorPart.js';
import { Door } from './Models/Door.js';
import { Window } from './Models/Window.js';
import { WindowPart } from './WallParts/WindowPart.js';
import { Group } from './libs/build/three.module.js';
import { DoorDepth } from './WallDepths/DoorDepth.js';
import { CreatePlinth } from './CreatePlinth.js';

export var CreateWall = async function( wall, p_path ){

    let group = new Group();
    group.name = wall.id;

    let wall_parts = [];

    for (let door of wall.doors){
        if ( wall.s.distanceTo( door.s ) > wall.s.distanceTo( door.e )) console.log("door error");

        let distance = wall.s.distanceTo( door.s );
        wall_parts.push({
            distance: distance,
            type: "door",
            object: door
        });
    }

    for (let window of wall.windows){
        if ( wall.s.distanceTo( window.s ) > wall.s.distanceTo( window.e )) console.log("window error");

        let distance = wall.s.distanceTo( window.s );
        wall_parts.push({
            distance: distance,
            type: "window",
            object: window
        });
    }


    if(wall_parts.length > 1){
        wall_parts.sort(function(a, b){
            if (a.distance > b.distance) return 1;
            if (a.distance == b.distance) return 0;
            if (a.distance < b.distance) return -1;
        })
    }

    wall_parts = wall_parts.filter((thing, index, self) =>
        index === self.findIndex((t) => (
            t.distance === thing.distance && t.type === thing.type
        ))
    );


    let s_p = wall.s;
    if ( wall.type === "room" ) await p_path.push( wall.s );


    for( let part of wall_parts ) {

        if (part.type === 'window') {
            const window = part.object;


            if (wall.type === "room") group.add ( WindowDepth( window ) );

            WindowPart.bind(wall)( s_p, window );
            if( window.toLoad ) group.add( await Window( window ) );


            wall.v_n += 8;
            s_p = window.e;
            if ( wall.type === "room" ) await p_path.push( window.e );

        } else if (part.type === 'door') {

            const door = part.object;

            if ( wall.type === "room" ) await p_path.push( door.s );
            if ( wall.type === "room" ) await p_path.push( "|" );

            const doorDepth = DoorDepth ( door );

            if (doorDepth) group.add ( doorDepth );

            DoorPart.bind( wall )( s_p, door );

            if( door.toLoad ) group.add( await Door( door) );


            wall.v_n += 7;
            s_p = door.e;
            if ( wall.type === "room" ) await p_path.push( door.e );
        }

    }

    SolidPart.bind( wall )( s_p );
    if ( wall.type === "room" ) await p_path.push( s_p );
    group.add( await CreateMesh( wall ) );


    return group;
};
