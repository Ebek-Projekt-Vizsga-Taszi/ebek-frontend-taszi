import React from "react";
import { useNavigate } from "react-router-dom"; // Navigációhoz

const Alert = ({ className, variant = "default", ...props }) => {
  const alertClasses = `relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${
    variant === "destructive"
      ? "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      : "bg-background text-foreground"
  } ${className || ""}`;

  return (
    <div role="alert" className={alertClasses} {...props}>
      {props.children}
    </div>
  );
};

const AlertTitle = ({ className, ...props }) => {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className || ""}`}
      {...props}
    />
  );
};

const AlertDescription = ({ className, ...props }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className || ""}`} {...props} />
  );
};

export const InvoiceAlert = () => {
  const navigate = useNavigate(); // Navigáció inicializálása

  return (
    <Alert>
      <AlertTitle>Itt az idő kitölteni az Ebösszeíró adatlapot!</AlertTitle>
      <AlertDescription>
        Ne halogasd tovább, töltsd ki az adatlapot, hogy minden információ naprakész legyen.
      </AlertDescription>
      <button
        onClick={() => navigate("/step1")} // Gombra kattintva navigálás a Step1-re
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Űrlap kitöltése
      </button>
    </Alert>
  );
};

export { Alert, AlertTitle, AlertDescription };