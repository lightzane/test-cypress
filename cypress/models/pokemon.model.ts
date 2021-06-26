export interface Pokemon {
    name: string;
    types: Types[];
}

interface Types {
    type: {
        name: string;
    };
}
