import React from 'react';
import ReactMarkdown from 'react-markdown';

const TextBody = ({ text }) => {
    return (
    <p className="mb-1x" style={{ overflowWrap: 'break-word' }}>
        <ReactMarkdown
            children={text}
        />
    </p>
    );
}

export default TextBody;
