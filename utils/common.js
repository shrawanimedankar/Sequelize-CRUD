const sendResponse = (res,
    {
        success = true,
        status_code = 200,
        message = success ? "Request successful." : "An error occurred.",
        data = null,
        error = null,
        // pagination = null,
        // meta = {},
    }
) => {
    const responseBody = {
        // meta: {
        //   request_id: meta.request_id || `req_${Date.now()}`,
        //   timestamp: meta.timestamp || new Date().toISOString(),
        // },
        success,
        status_code,
        message,
        data,
        error: error
            ? {
                code: error.code || "ERROR",
                message: error.message || String(error),
            }
            : null,
        // pagination,
    };
    return res.status(status_code).json(responseBody);
};
module.exports = { sendResponse };