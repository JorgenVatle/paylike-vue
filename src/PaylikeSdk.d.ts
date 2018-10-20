declare module Paylike {

    interface PopupField {
        name: string,
        label: string,
        type: string,
        required: boolean,
        value: any,
    }

    interface PopupOptions {
        currency: string,
        amount: number,
        title: string,
        description: string,
        locale: string,
        descriptor: string,
        custom: any,
        fields: Array<PopupField>,
    }

    type PopupCallback = (error: Error, response: any) => void;

    function popup(config: PaymentOptions, callback: PopupCallback): void;
}