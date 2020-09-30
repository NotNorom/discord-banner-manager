// https://stackoverflow.com/a/54140811
export const mapToObj = (m: Iterable<unknown> | ArrayLike<unknown>) => {
    return Array.from(m).reduce((obj: any, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
};

// https://stackoverflow.com/a/54140811
export const mapToAoO = (m: Iterable<unknown> | ArrayLike<unknown>) => {
    return Array.from(m).map( ([k,v]) => {return {[k]:v}} );
};