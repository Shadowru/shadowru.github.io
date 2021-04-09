export var r_d = function( a ) {
    let b = [];
    a.forEach(arr => {
        if (!b.some(an => JSON.stringify(an) === JSON.stringify(arr))) b.push(arr);

    });

    return b
};
