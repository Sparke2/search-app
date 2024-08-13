import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

function Checkbox({ id, label, checked, onChange }) {
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef(null);

    const handleCheckboxChange = (event) => {
        setShowButton(prev => !prev);
        onChange(id, event.target.checked);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Form.Group className="position-relative">
            <Form.Check
                type="checkbox"
                id={id}
                label={label}
                checked={checked}
                onChange={handleCheckboxChange}
            />
            {showButton && (
                <Button
                    ref={buttonRef}
                    variant="primary"
                    onClick={() => setShowButton(false)}
                    className="apply mt-2"
                >
                    Применить
                </Button>
            )}
        </Form.Group>
    );
}

export default Checkbox;
