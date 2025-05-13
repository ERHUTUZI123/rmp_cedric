import React from 'react';
import { StationComponentProps, StationType } from '../../../constants/stations';

const MyStationComponent = (props: StationComponentProps) => {
    // destructure the props
    const { id, x, y, attrs, handlePointerDown, handlePointerMove, handlePointerUp } = props;
    // destructure the specific attributes of your station
    // `StationType.MyStation` will be added in the 8th step and it's ok to do that now,
    // if you do not want to see any errors :)
    const { names = defaultStationAttributes.names } = attrs[StationType.MyStation] ?? defaultMyStationAttributes;

    // some boilerplate to cache a function between re-renders
    const onPointerDown = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerDown(id, e),
        [id, handlePointerDown]
    );
    const onPointerMove = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerMove(id, e),
        [id, handlePointerMove]
    );
    const onPointerUp = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerUp(id, e),
        [id, handlePointerUp]
    );

    // return an SVG JSX element
    return React.memo(
        () => (
            <g id={id} transform={`translate(${x}, ${y})`}>
                {/* your SVG elements go here */}
                <circle
                    id={`stn_core_${id}`} // a must have id to tell the code which station is being pointed at
                    r={5} // the radius of the circle
                    stroke="black" // stroke color of the circle
                    fill="white" // fill color of the circle
                    onPointerDown={onPointerDown} // on pointer down event handler
                    onPointerMove={onPointerMove} // on pointer move event handler
                    onPointerUp={onPointerUp} // on pointer up event handler
                    style={{ cursor: 'move' }} // change the mouse icon when users move their mouse on the station
                />
            </g>
        ),
        [id, x, y, ...names, onPointerDown, onPointerMove, onPointerUp]
    );
};