function updateDataHandler(originalData, updates) {
    for (const key in updates) {
        if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
            // Nếu giá trị là một object, gọi đệ quy
            if (!originalData[key]) {
                originalData[key] = {}; // Tạo object nếu chưa tồn tại
            }
            updateDataHandler(originalData[key], updates[key]);
        } else {
            // Cập nhật giá trị trực tiếp
            originalData[key] = updates[key];
        }
    }
    return originalData;
}

export { updateDataHandler };