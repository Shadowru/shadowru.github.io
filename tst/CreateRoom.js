import { CreateWall } from './CreateWall.js';
import { CreateFloor } from './CreateFloor.js';
import { CreateCeiling } from './CreateCeiling.js';
import { Group } from './libs/build/three.module.js';
import { CreatePlinth } from './CreatePlinth.js';

export var CreateRoom = async function( room ){

    let group = new Group();
    group.name = "room_" + room.type ;

    for( let wall of room.walls )         await group.add( await CreateWall( wall, room.plinth_path ) );
    for( let doorstep of room.doorsteps ) await group.add( await CreateFloor( doorstep, room.id ) );
                                          await group.add( await CreateFloor( room.floor, room.id ) );
                                          await group.add( await CreateCeiling( room.floor, room.height ) );
                                          await group.add( await CreatePlinth( room.plinth_path, room.id ) );

    return group;
};
