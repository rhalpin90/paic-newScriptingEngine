export type JsonValue = {
    asBoolean: () => boolean;
    asDouble: () => number;
    asInteger: () => number;
    asList: () => any[];
    asLong: () => number;
    asMap: () => Record<any, any>;
    asNumber: () => number;
    asString: () => string;
};
