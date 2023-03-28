import { Calendar, theme } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

type Props = {
    defaultDate?: Dayjs;
    onToggle: (value: boolean) => void;
    onDueDateSelect: (value: Dayjs | undefined) => void;
};

export const CalendarItem: React.FC<Props> = ({ defaultDate, onToggle, onDueDateSelect }) => {
    const { token } = theme.useToken();
    const [, setValue] = useState(defaultDate);
    const [selectedValue, setSelectedValue] = useState(defaultDate);
    const [isPreventSelect, setIsPreventSelect] = useState(true);

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (value: Dayjs) => {
        setIsPreventSelect(true);
        setValue(value);
    };

    useEffect(() => {
        if (!isPreventSelect) {
            onDueDateSelect(selectedValue);
            onToggle(false);
        } else {
            setIsPreventSelect(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);

    const handleDisableDate = (currentDate: Dayjs) => {
        const yesterday = dayjs().subtract(1, 'd');

        return currentDate.isBefore(yesterday);
    };

    return (
        <div style={wrapperStyle}>
            <Calendar
                fullscreen={false}
                defaultValue={selectedValue}
                // value={value}
                disabledDate={handleDisableDate}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
            />
        </div>
    );
};
