export enum AlertType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
}

export interface Alert {
    type: AlertType;
    title: string;
    message: string;
    icon: string;
    onClick?: () => void;
}

