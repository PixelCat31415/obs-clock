// base class for clock gadgets

export interface Gadget {
    render(): void;
    input(key: string): void;
}
