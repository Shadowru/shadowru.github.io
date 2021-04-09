export var MiniMap = async function( svg_data ){

    const points = await svg_data;
    const size = 4.7;
    let floorsNum = 0;

    this.container.insertAdjacentHTML('afterend', '<svg id="svg_plan"></svg>');
    let s = ( Snap ? Snap("#svg_plan") : null );

    if(s){

        let floors = s.group();
        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;


        function _hover(){
            if(this.attr('active') === 'false'){
                this.stop();
                this.animate({ fill: "rgba(134,193,244,0.27)", }, 200, mina.easeinout);
            }
        }
        //86C1F4
        function _unhover() {
            if(this.attr('active') === 'false'){
                this.animate({ fill: "rgba(134,193,244,0.16)" }, 200, mina.easeinout);
            }
        }

        async function _click() {
            if (this.attr('active') === 'false' ) {

                this.stop();
                this.attr({active: 'true'});
                this.animate({ fill: "rgba(134,193,244,0.38)", }, 200, mina.easeinout);


                for(let i=0; i<floorsNum; i++) {
                    if (floors[i].id !== this.id){
                        floors[i].attr({active: 'false'});
                        floors[i].animate({ fill: "rgba(134,193,244,0.15)" }, 200, mina.easeinout);
                    }
                }
            }
            else if (this.attr('active') === 'true') {
                this.stop();
                this.attr( { active: 'false' } );

            }
        }

        let i = 0;
        points.rooms.forEach(function(room){
            floorsNum++;

            let points = [];

            room.points.forEach(function(point){

                let x = point[0]/size;
                let y = point[1]/size;

                points.push( point[0]/size, point[1]/size );

                if(i === 0){

                    minX = maxX = x;
                    minY = maxY = y;

                    i++;

                }else{

                    if(x < minX){ minX = x; }
                    if(x > maxX){ maxX = x; }
                    if(y < minY){ minY = y; }
                    if(y > maxY){ maxY = y; }

                }
            });


            floors.add( s.polyline(points).attr({
                fill: "rgba(134,193,244,0.2)",
                active: false}).hover(_hover, _unhover).click(_click));
        });
//6AA0CF
        let tX = 0;
        let tY = 0;

        if( minX < 0 ){ tX = minX * -1; }
        else if( minX > 0 ){ tX = minX * -1; }

        if( minY < 0 ){ tY = minY * -1; }
        else if( minY > 0 ){ tY = minY * -1; }

        let widthSVG = (minX <= 0 ? maxX + (minX * (minX == 0 ? 1 : -1)) : maxX - minX);
        let heightSVG = (minY <= 0 ? maxY + (minY * (minY == 0 ? 1 : -1)) : maxY - minY);;

        floors.transform("t"+tX+", "+tY);

        s.attr({
            width: widthSVG,
            height: heightSVG
        });

        document.getElementById('svg_plan').style.position = 'absolute';
        document.getElementById('svg_plan').style.right = "3%";
        document.getElementById('svg_plan').style.bottom = "75%";
        document.getElementById('svg_plan').style.zIndex = "1024";
        document.getElementById('svg_plan').style.border = "20px solid #";

    }

};
