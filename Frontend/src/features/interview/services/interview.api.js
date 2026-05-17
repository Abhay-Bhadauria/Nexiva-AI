import axios from "axios";

const api = axios.create({
    baseURL: "https://interviewiq-backend-gen9.onrender.com",
    withCredentials: true,
});


// ===================== AXIOS INTERCEPTOR =====================

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    // Only attach token if valid token exists
    if (
        token &&
        token !== "undefined" &&
        token !== "null"
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// ===================== GENERATE INTERVIEW REPORT =====================

/**
 * @description Service to generate interview report
 * based on user self description, resume and job description.
 */

export const generateInterviewReport = async ({
    title,
    jobDescription,
    selfDescription,
    resumeFile
}) => {

    try {

        const formData = new FormData();

        // REQUIRED FIELDS
        formData.append("title", title);
        formData.append("jobDescription", jobDescription);

        // OPTIONAL FIELDS
        formData.append("selfDescription", selfDescription);

        // FILE
        formData.append("resume", resumeFile);

        // DEBUGGING
        console.log("TITLE:", title);
        console.log("JOB DESCRIPTION:", jobDescription);
        console.log("SELF DESCRIPTION:", selfDescription);
        console.log("RESUME:", resumeFile);

        const response = await api.post(
            "/api/interview/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;

    } catch (err) {

        console.log("INTERVIEW REPORT ERROR:", err);

        throw err;
    }
};


// ===================== GET INTERVIEW REPORT BY ID =====================

/**
 * @description Service to get interview report by interviewId.
 */

export const getInterviewReportById = async (interviewId) => {

    try {

        const response = await api.get(
            `/api/interview/report/${interviewId}`
        );

        return response.data;

    } catch (err) {

        console.log(err);

        throw err;
    }
};


// ===================== GET ALL INTERVIEW REPORTS =====================

/**
 * @description Service to get all interview reports of logged in user.
 */

export const getAllInterviewReports = async () => {

    try {

        const response = await api.get("/api/interview/");

        return response.data;

    } catch (err) {

        console.log(err);

        throw err;
    }
};


// ===================== GENERATE RESUME PDF =====================

/**
 * @description Service to generate resume pdf
 * based on interview report.
 */

export const generateResumePdf = async ({ interviewReportId }) => {

    try {

        const response = await api.post(
            `/api/interview/resume/pdf/${interviewReportId}`,
            null,
            {
                responseType: "blob"
            }
        );

        return response.data;

    } catch (err) {

        console.log(err);

        throw err;
    }
};