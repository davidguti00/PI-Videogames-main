

export const starsValue = (value)=>{

    if (value > 0 && value < 1) return "";
    if (value > 1 && value < 2)return "⭐ ";
    if(value > 2 && value < 3) return "⭐ ⭐";
    if(value > 3 && value < 4) return "⭐ ⭐ ⭐";
    if(value > 4 && value < 5) return "⭐ ⭐ ⭐ ⭐";
    if(value >= 5) return "⭐ ⭐ ⭐ ⭐ ⭐";
}