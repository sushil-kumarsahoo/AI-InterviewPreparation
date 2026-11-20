import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useState, useCallback } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const generateReport = useCallback(
    async ({ jobDescription, selfDescription, resumeFile }) => {
      setLoading(true);
      try {
        const response = await generateInterviewReport({
          jobDescription,
          selfDescription,
          resumeFile,
        });
        setReport(response?.interviewReport);
        return response?.interviewReport;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport]
  );

  const getReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      try {
        const response = await getInterviewReportById(interviewId);
        setReport(response?.interviewReport);
        return response?.interviewReport;
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport]
  );

  const getReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response?.interviewReports || []);
      return response?.interviewReports || [];
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  const getResumePdf = useCallback(async (interviewId) => {
    setDownloadingPdf(true);
    try {
      const blobData = await generateResumePdf({ interviewId });
      const url = window.URL.createObjectURL(
        new Blob([blobData], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingPdf(false);
    }
  }, []);

  return {
    loading,
    downloadingPdf,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
