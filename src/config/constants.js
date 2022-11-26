const noIcon = `data:image/png;base64,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`;

module.exports = noIcon;