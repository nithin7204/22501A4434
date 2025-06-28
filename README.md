## LoggingMiddleware

### Why we used the package

- **axios**: Used to make HTTP POST requests to the remote evaluation logging API. It is lightweight, promise-based, and easy to use for sending logs.
- **No console.log**: As per requirements, all logs must be sent to the evaluation API, not to the console.

### Logic in short

- Exports an async function `log(stack, level, package, message)` that sends a log object to the evaluation API.
- Handles all logging for the backend microservice.
- Silently fails if the log cannot be sent (no console output).

---

## Backend

### Why we used the packages

- **express**: Minimal and flexible Node.js web application framework for building the REST API endpoints.
- **nanoid**: Used for generating unique, secure, URL-friendly shortcodes for shortened URLs.

### Logic in short

- **Microservice** exposes endpoints to create, redirect, and get statistics for short URLs.
- **Shortener logic** ensures:
  - Unique shortcodes (auto-generated or user-provided, with validation).
  - Default expiry of 30 minutes if not specified.
  - In-memory storage for URLs and statistics.
  - Redirection to the original URL.
  - Statistics endpoint returns total clicks, creation/expiry, and click details.
- **Logging**: All important events and errors are logged using the custom logging middleware, as required.
- **No user authentication**: API is open as per requirements.

---

## How to Use

1. Start the backend server from the `BackendTestSubmission` folder.
2. Use the API endpoints to create, redirect, and get stats for short URLs.
3. All logs are automatically sent to the evaluation API via the logging