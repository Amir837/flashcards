export default function ConvertPGNtoArray(PGNstr: String){
    // split by space
    // delete all items that start wiht number

    var splited :String[] = PGNstr.split(' ');

    let ind :number = 0;

    while (ind < splited.length){
        if (!isNaN(Number(splited[ind].charAt(0)))){
            splited.splice(ind, 1);
        }

        ind++;
    }

    return splited;
}