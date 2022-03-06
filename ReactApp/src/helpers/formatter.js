
export const formatCurrency = (value) => {
    if (!value) return '0';

    if (typeof value === "string" || "String") value = parseInt(value);

    if (value < 1000) return value + " đồng";

    if (value < 1000000) return (value/1000).toFixed(2) + " nghìn";

    if (value < 1000000000) return (value/1000000).toFixed(2) + " triệu";

    return (value/1000000000).toFixed(2) + " tỷ";
};

export const formatMoneyInput = (value) => {
    if (!value) return '';

    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const slugRoute = (text) => {
    if (text) {
        // Convert ve lower case
        text = text.toLowerCase();
    
        //Bo cac ky tu dac biet
        text = text.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        text = text.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        text = text.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        text = text.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        text = text.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        text = text.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        text = text.replace(/(đ)/g, 'd');
 
        // Xoa khoang trang
        text = text.replace(/([^0-9a-z-\s])/g, '');
 
        // Xoa dau gach ngang
        text = text.replace(/(\s+)/g, '-');
 
        // Xoa gach ngang o dau
        text = text.replace(/^-+/g, '');
 
        // Xoa gach ngang o cuoi
        text = text.replace(/-+$/g, '');
 
        return text;
    }
    return '';
}

export const getFullAddress = (address, ward, district, province) => {
    let fullAddress = [
      address || "",
      ward?.name || "",
      district?.name || "",
      province?.name || "",
    ].filter((element) => element !== "");
    return fullAddress.join(", ");
};