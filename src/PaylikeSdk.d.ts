export interface PopupField {
    name: string,
    label: string,
    type: string,
    required: boolean,
    value: any,
}

export interface PopupOptions {
    currency: string,
    amount: number,
    title: string,
    description: string,
    locale: string,
    descriptor: string,
    custom: any,
    fields: Array<PopupField>,
}

export type PopupCallback = (error: Error, response: any) => void;

export interface PaylikeInstance {
    popup(config: PaymentOptions, callback: PopupCallback): void
}

declare global {
    function Paylike(apiKey: string): PaylikeInstance;
    interface window {
        Paylike: typeof Paylike
    }
}