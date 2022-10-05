import React from 'react';

const ActiveDot = React.memo(function ActiveDot(){
    return <object data="/visuals/activedot.svg"/>
});

const InactiveDot = React.memo(function InactiveDot(){
    return <object data="/visuals/inactivedot.svg"/>
});

export {
    ActiveDot,
    InactiveDot
}