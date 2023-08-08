import React from "react";

interface IErrorBanner {
  message: string;
}
const ErrorBanner = ({ message }: IErrorBanner) => {
  const errorMessage = message || "에러입니다.";
  return (
    <div
      data-testid="error-banner"
      style={{
        backgroundColor: "skyblue",
        color: "white",
      }}
    >
      {errorMessage}
    </div>
  );
};

export default ErrorBanner;
