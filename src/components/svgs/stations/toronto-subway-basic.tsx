import { RmgFields, RmgFieldsField } from '@railmapgen/rmg-components';
import { MonoColour } from '@railmapgen/rmg-palette-resources';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AttrsProps, CanvasType, CategoriesType, CityCode } from '../../../constants/constants';
import {
    NameOffsetX,
    NameOffsetY,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
    defaultStationAttributes,
} from '../../../constants/stations';
import { ColorAttribute, ColorField } from '../../panels/details/color-field';
import { MultilineText, NAME_DY } from '../common/multiline-text';
import { MultilineTextVertical } from '../common/multiline-text-vertical';

const NAME_TT_BASIC = {
    en: {
        size: 10,
        baseOffset: 1,
    },
    zh: {
        size: 5,
        baseOffset: 1.5,
    },
};

const NAME_DY_TT_BASIC = {
    top: {
        lineHeight: 5,
        offset: 1 + NAME_TT_BASIC.zh.baseOffset + 2.5, // offset + baseOffset + iconRadius
        polarity: -1,
    },
    middle: {
        lineHeight: 0,
        offset: NAME_TT_BASIC.en.size / 2,
        polarity: 1,
    },
    bottom: {
        lineHeight: 10,
        offset: 0 + NAME_TT_BASIC.en.baseOffset + 2.5, // offset + baseOffset + iconRadius
        polarity: 1,
    },
};

const TorontoSubwayBasicStation = (props: StationComponentProps) => {
    const { id, x, y, attrs, handlePointerDown, handlePointerMove, handlePointerUp } = props;
    const {
        names = defaultStationAttributes.names,
        color = defaultTorontoSubwayBasicStationAttributes.color,
        nameOffsetX = defaultTorontoSubwayBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultTorontoSubwayBasicStationAttributes.nameOffsetY,
        textVertical = defaultTorontoSubwayBasicStationAttributes.textVertical,
    } = attrs[StationType.TorontoSubwayBasic] ?? defaultTorontoSubwayBasicStationAttributes;

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

    const textX = nameOffsetX === 'left' ? -5 : nameOffsetX === 'right' ? 5 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split('\n').length * NAME_DY_TT_BASIC[nameOffsetY].lineHeight +
            NAME_DY_TT_BASIC[nameOffsetY].offset) *
        NAME_DY_TT_BASIC[nameOffsetY].polarity;
    const textAnchor = nameOffsetX === 'left' ? 'end' : nameOffsetX === 'right' ? 'start' : 'middle';

    const textVerticalY = nameOffsetY === 'top' ? -2.5 - 2 : 2.5 + 2; // iconRadius + verticalOffset
    const textVerticalAnchor = nameOffsetY === 'top' ? 'end' : 'start';
    const textVerticalEnX = (names[0].split('\n').length * NAME_TT_BASIC.zh.size) / 2 + NAME_TT_BASIC.en.baseOffset;

    return (
        <g id={id} transform={`translate(${x}, ${y})`}>
            <circle
                id={`stn_core_${id}`}
                r={3}
                stroke={color[2]}
                strokeWidth="1"
                fill="white"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{ cursor: 'move' }}
            />
            {!textVertical ? (
                <g transform={`translate(${textX}, ${textY})`} textAnchor={textAnchor}>
                    <MultilineText
                        text={names[0].split('\n')}
                        fontSize={NAME_TT_BASIC.zh.size}
                        lineHeight={NAME_TT_BASIC.zh.size}
                        grow="up"
                        baseOffset={NAME_TT_BASIC.zh.baseOffset}
                        className="rmp-name__zh"
                    />
                    <MultilineText
                        text={names[1].split('\n')}
                        fontSize={NAME_TT_BASIC.en.size}
                        lineHeight={NAME_TT_BASIC.en.size}
                        grow="down"
                        baseOffset={NAME_TT_BASIC.en.baseOffset}
                        className="rmp-name__en"
                        fill="gray"
                    />
                </g>
            ) : (
                <>
                    <g transform={`translate(-1, ${textVerticalY})`} textAnchor={textVerticalAnchor}>
                        <MultilineTextVertical
                            text={names[0].split('\n')}
                            fontSize={NAME_TT_BASIC.zh.size}
                            lineWidth={NAME_TT_BASIC.zh.size}
                            grow="bidirectional"
                            baseOffset={NAME_TT_BASIC.zh.baseOffset}
                            dominantBaseline="central"
                            className="rmp-name__zh"
                        />
                    </g>
                    <g
                        transform={`translate(${textVerticalEnX}, ${textVerticalY})rotate(90)`}
                        textAnchor={textVerticalAnchor}
                    >
                        <MultilineText
                            text={names[1].split('\n')}
                            fontSize={NAME_TT_BASIC.en.size}
                            lineHeight={NAME_TT_BASIC.en.size}
                            grow="up"
                            baseOffset={NAME_TT_BASIC.en.baseOffset}
                            className="rmp-name__en"
                            dominantBaseline="central"
                            fill="gray"
                        />
                    </g>
                </>
            )}
        </g>
    );
};

/**
 * SuzhouRTBasicStation specific props.
 */
export interface TorontoSubwayBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    textVertical: boolean;
}

const defaultTorontoSubwayBasicStationAttributes: TorontoSubwayBasicStationAttributes = {
    ...defaultStationAttributes,
    color: [CityCode.Toronto, 'sz1', '#78BA25', MonoColour.white],
    nameOffsetX: 'right',
    nameOffsetY: 'top',
    textVertical: false,
};

const TorontoSubwayBasicAttrsComponent = (props: AttrsProps<TorontoSubwayBasicStationAttributes>) => {
    const { id, attrs, handleAttrsUpdate } = props;
    const { t } = useTranslation();

    const fields: RmgFieldsField[] = [
        {
            type: 'textarea',
            label: t('panel.details.stations.common.nameZh'),
            value: attrs.names[0],
            onChange: val => {
                attrs.names[0] = val;
                handleAttrsUpdate(id, attrs);
            },
            minW: 'full',
        },
        {
            type: 'textarea',
            label: t('panel.details.stations.common.nameEn'),
            value: attrs.names.at(1) ?? defaultTorontoSubwayBasicStationAttributes.names[1],
            onChange: val => {
                attrs.names[1] = val;
                handleAttrsUpdate(id, attrs);
            },
            minW: 'full',
        },
        {
            type: 'select',
            label: t('panel.details.stations.common.nameOffsetX'),
            value: attrs.nameOffsetX ?? defaultTorontoSubwayBasicStationAttributes.nameOffsetX,
            options: {
                left: t('panel.details.stations.common.left'),
                middle: t('panel.details.stations.common.middle'),
                right: t('panel.details.stations.common.right'),
            },
            disabledOptions: attrs.nameOffsetY === 'middle' ? ['middle'] : [],
            onChange: val => {
                attrs.nameOffsetX = val as NameOffsetX;
                if (attrs.nameOffsetX !== 'middle') attrs.textVertical = false;
                handleAttrsUpdate(id, attrs);
            },
            minW: 'full',
        },
        {
            type: 'select',
            label: t('panel.details.stations.common.nameOffsetY'),
            value: attrs.nameOffsetY ?? defaultTorontoSubwayBasicStationAttributes.nameOffsetY,
            options: {
                top: t('panel.details.stations.common.top'),
                middle: t('panel.details.stations.common.middle'),
                bottom: t('panel.details.stations.common.bottom'),
            },
            disabledOptions: attrs.nameOffsetX === 'middle' ? ['middle'] : [],
            onChange: val => {
                attrs.nameOffsetY = val as NameOffsetY;
                if (attrs.nameOffsetY === 'middle') attrs.textVertical = false;
                handleAttrsUpdate(id, attrs);
            },
            minW: 'full',
        },
        {
            type: 'switch',
            label: t('panel.details.stations.suzhouRTBasic.textVertical'),
            isChecked: attrs.textVertical ?? defaultTorontoSubwayBasicStationAttributes.textVertical,
            isDisabled: attrs.nameOffsetY === 'middle' || attrs.nameOffsetX !== 'middle',
            onChange: (val: boolean) => {
                attrs.textVertical = val;
                handleAttrsUpdate(id, attrs);
            },
            oneLine: true,
            minW: 'full',
        },
        {
            type: 'custom',
            label: t('color'),
            component: (
                <ColorField
                    type={StationType.TorontoSubwayBasic}
                    defaultTheme={defaultTorontoSubwayBasicStationAttributes.color}
                />
            ),
        },
    ];
    return <RmgFields fields={fields} />;
};

const torontoSubwayBasicStationIcon = (
    <svg width="303" height="303" viewBox="0 0 303 303" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="303" height="303" fill="white" />
        <circle cx="151.5" cy="151.5" r="151.5" fill="black" />
        <circle cx="151.5" cy="151.5" r="122.5" fill="white" />
    </svg>
);

const torontoSubwayBasicStation: Station<TorontoSubwayBasicStationAttributes> = {
    component: TorontoSubwayBasicStation,
    icon: torontoSubwayBasicStationIcon,
    defaultAttrs: defaultTorontoSubwayBasicStationAttributes,
    attrsComponent: TorontoSubwayBasicAttrsComponent,
    metadata: {
        displayName: 'panel.details.stations.suzhouRTBasic.displayName',
        cities: [CityCode.Toronto],
        canvas: [CanvasType.RailMap],
        categories: [CategoriesType.Metro],
        tags: [],
    },
};

export default torontoSubwayBasicStation;
