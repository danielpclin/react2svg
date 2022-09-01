export const toMap = (array: Array<any>, key_name: string) => {
    return array.reduce(function(map, obj) {
        map[obj[key_name]] = { ...obj };
        return map;
    }, {});
};

export const download = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
}

export const copyToClipboard = (text_to_copy: string) => {
    if (!navigator.clipboard){
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.value = text_to_copy;
        input.select();
        document.execCommand('copy');
        input.remove();
    } else {
        navigator.clipboard.writeText(text_to_copy).then(
            // function(){
            //     alert("yeah!"); // success
            // })
            // .catch(
            //     function() {
            //         alert("err"); // error
            // }
        );
    }
};