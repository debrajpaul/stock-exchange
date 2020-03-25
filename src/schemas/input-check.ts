// this is for input request json validator
export default {
    type: "object",
    properties: {
        min: { type: "string" }
    },
    required: ["min"]
};
