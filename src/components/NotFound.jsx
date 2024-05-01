import React from 'react';
import '/src/style/notFound.scss';

function NotFound() {
    return (
        <div className="not-found">
            <h1>404 - Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>
    );
}

export default NotFound;