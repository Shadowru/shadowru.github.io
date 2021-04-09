import { Vector2 } from './libs/build/three.module.js';
import { point_on_line } from "./calculus/point_on_line.js";
import { polygon_centr } from "./calculus/polygon_center.js";
import { middle_point } from "./calculus/middle.js";
import { simplify } from "./calculus/simplify.js";

export var json_construct = function( drawingData ){

    let rooms = [];

    const height = 270;
    const door_height = 210;
    const window_height = 150;
    const window_floor_height = 85;

    let outside = { walls: [], holes: [] };
    outside.points = simplify(drawingData.external_walls, 3).map( p => new Vector2( p[0], p[1] ));

    let rooms_data = drawingData.rooms;
    let doors = drawingData.doors;
    let entrance_doors = drawingData.entrance_doors;
    let windows = drawingData.windows;

    function camera_pos(roomsData) {

        let Xs = 0;
        let Ys = 0;

        let i = 0;
        for (let p of roomsData){

            i++;
            Xs += p.center.x;
            Ys += p.center.y;
        }

        return  {x: Xs/i, y: Ys/i };

    }

    function polygon_depth(arr){

        let v_1 = new Vector2(arr[0][0], arr[0][1]);
        let v_2 = new Vector2(arr[1][0], arr[1][1]);
        let v_3 = new Vector2(arr[2][0], arr[2][1]);

        let dist1 = v_1.distanceTo(v_2);
        let dist2 = v_2.distanceTo(v_3);

        if (dist1 > dist2 ) return dist2;
        else return dist1;
    }

    //const toVec = (arr) => {arr.map( p => new Vector2( p[0], p[1] ))};

    let r_num = 0;

    let wall = {};
    let room = {};
    let door = {};
    let window = {};

    let doors_added = [];

    for ( let r of rooms_data ){

        r_num++;

        room = {
            type: r.type,
            id: r.type+'_'+r_num,
            doorsteps: [],
            walls: [],
            floor: r.points.map(p=> new Vector2(p[0], p[1]) ),
            height: height,
            objects: r.objects,
            center: polygon_centr( r.points.map(p=> new Vector2(p[0], p[1]) ) ),
            plinth_path: [],//r.points.map(p=> new Vector2(p[0], p[1]) )
            plinth_holes: []
        };

        outside.holes.push( room.floor );

        //INNER WALLS
        for (let i = 0, l = room.floor.length; i < l; i++) {

            const vec_s = room.floor[i];
            const vec_e = room.floor[i + 1 === l ? 0 : i + 1];

            wall = {
                height: height,
                id: room.id + "_" + i,
                type: "room",
                s: vec_s,
                e: vec_e,
                vertices: [],
                faces: [],
                v_n: 0,
                doors: [],
                windows: []
            };

            //doors
            door:
            for (let h = 0, k = doors.length; h < k; h++) {

                for (let j = 0, m = doors[h].length; j < m; j++) {

                    const d_s1 = new Vector2 ( doors[h][j][0], doors[h][j][1] );
                    const d_s2 = new Vector2 ( doors[h][j + 1 === m ? 0 : j + 1][0], doors[h][j + 1 === m ? 0 : j + 1][1] );

                    if( point_on_line( vec_s, vec_e, middle_point( d_s1, d_s2 ))){

                        room.doorsteps.push(doors[h].map( p => new Vector2 ( p[0], p[1])));
                        room.plinth_holes.push(d_s1, d_s2);
                        door = {
                            toLoad: !doors_added.includes(h),
                            room_id: room.id,
                            wall_id: wall.id,
                            id: "room_"+d_s1,
                            e: d_s1,
                            s: d_s2,
                            width: Math.round( d_s2.distanceTo(d_s1)),
                            points:doors[h],
                            center: polygon_centr(doors[h].map( p => new Vector2( p[0], p[1] ))),
                            height: door_height,
                        };

                        wall.doors.push( door );
                        doors_added.push(h);
                        //break door;

                    }
                }
            }

            //entrance_doors
            for (let h = 0, k = entrance_doors.length; h < k; h++) {

                for (let j = 0, m = entrance_doors[h].length; j < m; j++) {

                    const d_s1 = new Vector2 ( entrance_doors[h][j][0], entrance_doors[h][j][1] );
                    const d_s2 = new Vector2 ( entrance_doors[h][j + 1 === m ? 0 : j + 1][0], entrance_doors[h][j + 1 === m ? 0 : j + 1][1] );

                    if( point_on_line( vec_s, vec_e, middle_point( d_s1, d_s2 ))){

                        room.doorsteps.push(entrance_doors[h].map( p => new Vector2 ( p[0], p[1])));
                        //room.plinth_path.push(d_s1, d_s2);
                        door = {
                            room_id: room.id,
                            wall_id: wall.id,
                            id: "entry_"+h,
                            e: d_s1,
                            s: d_s2,
                            width: Math.round( d_s2.distanceTo(d_s1)),
                            points: entrance_doors[h],
                            center: polygon_centr(entrance_doors[h].map( p => new Vector2( p[0], p[1] ))),
                            height: door_height,
                        };

                        wall.doors.push( door );
                        //break door;

                    }
                }

            }

            //windows
            window:
            for (let h = 0, k = windows.length; h < k; h++) {

                for (let j = 0, m = windows[h].length; j < m; j++) {

                    const w_s1 = new Vector2 ( windows[h][j][0], windows[h][j][1] );
                    const w_s2 = new Vector2 ( windows[h][j + 1 === m ? 0 : j + 1][0], windows[h][j + 1 === m ? 0 : j + 1][1] );

                    if( point_on_line( vec_s, vec_e, middle_point( w_s1, w_s2 ))){

                        window = {
                            toLoad: true,
                            room_id: room.id,
                            wall_id: wall.id,
                            id: wall.id + "_" +h,
                            e: w_s1,
                            s: w_s2,
                            width: Math.round( w_s2.distanceTo(w_s1)),
                            depth: polygon_depth(windows[h]),
                            points: windows[h],
                            height: window_height,
                            center: polygon_centr(windows[h].map( p => new Vector2( p[0], p[1] ))),
                            floor_height: window_floor_height,
                            is_created: false
                        };

                        wall.windows.push( window );
                        break window;
                    }
                }
            }

            room.walls.push ( wall );
        }



        rooms.push(room);

    }

            //OUTSIDE WALLS
    for (let i = 0, l = outside.points.length; i < l; i++) {

        const vec_s = outside.points[i];
        const vec_e = outside.points[i + 1 === l ? 0 : i + 1];

        wall = {
            height: height,
            id: "outside_" + i,
            type: "outside",
            s: vec_s,
            e: vec_e,
            vertices: [],
            faces: [],
            v_n: 0,
            doors: [],
            windows: []
        };

        //doors
        for (let h = 0, k = doors.length; h < k; h++) {

                for (let j = 0, m = doors[h].length; j < m; j++) {

                    const d_s1 = new Vector2 ( doors[h][j][0], doors[h][j][1] );
                    const d_s2 = new Vector2 ( doors[h][j + 1 === m ? 0 : j + 1][0], doors[h][j + 1 === m ? 0 : j + 1][1] );

                    if( point_on_line( vec_s, vec_e, middle_point( d_s1, d_s2 ))){

                        door = {
                            room_id: 'outside',
                            wall_id: wall.id,
                            id: wall.id+"_"+h,
                            s: d_s2,
                            e: d_s1,
                            width: Math.round( d_s2.distanceTo(d_s1) ),
                            points:doors[h],
                            center: polygon_centr(doors[h].map( p => new Vector2( p[0], p[1] ))),
                            height: door_height,
                            is_created: false
                        };

                        wall.doors.push( door );

                    }
                }
            }

        //entrance_doors
        for (let h = 0, k = entrance_doors.length; h < k; h++) {

            for (let j = 0, m = entrance_doors[h].length; j < m; j++) {

                const d_s1 = new Vector2 ( entrance_doors[h][j][0], entrance_doors[h][j][1] );
                const d_s2 = new Vector2 ( entrance_doors[h][j + 1 === m ? 0 : j + 1][0], entrance_doors[h][j + 1 === m ? 0 : j + 1][1] );

                if( point_on_line( vec_s, vec_e, middle_point( d_s1, d_s2 ))){

                    door = {
                        room_id: room.id,
                        wall_id: wall.id,
                        id: wall.id+"_"+h,
                        e: d_s1,
                        s: d_s2,
                        width: Math.round( d_s2.distanceTo(d_s1)),
                        points: entrance_doors[h],
                        center: polygon_centr(entrance_doors[h].map( p => new Vector2( p[0], p[1] ))),
                        height: door_height,
                        is_created: false
                    };

                    wall.doors.push( door );
                }
            }
        }

        //windows
        for (let h = 0, k = windows.length; h < k; h++) {

                for (let j = 0, m = windows[h].length; j < m; j++) {

                    const w_s1 = new Vector2 ( windows[h][j][0], windows[h][j][1] );
                    const w_s2 = new Vector2 ( windows[h][j + 1 === m ? 0 : j + 1][0], windows[h][j + 1 === m ? 0 : j + 1][1] );

                    if( point_on_line( vec_s, vec_e, middle_point( w_s1, w_s2 ))){

                        window = {
                            toLoad: false,
                            room_id: room.id,
                            wall_id: wall.id,
                            id: wall.id + "_" +h,
                            e: w_s1,
                            s: w_s2,
                            width: Math.round( w_s2.distanceTo(w_s1)),
                            points: windows[h],
                            height: window_height,
                            center: polygon_centr(windows[h].map( p => new Vector2( p[0], p[1] ))),
                            floor_height: window_floor_height,
                            is_created: false
                        };

                        wall.windows.push( window );
                    }
                }
            }

        outside.walls.push ( wall );

    }

    return {rooms: rooms, center: camera_pos( rooms ), height: height, outside: outside }
};
