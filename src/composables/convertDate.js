import moment from "jalali-moment";

export function convertDatee() {
  const toJalali = (date) => {
    if (!date) return "";
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
  };

  const toIso = (date) => {
    if (!date) return "";
    return moment.from(date, "fa", "jYYYY/jMM/jDD").format("YYYY-MM-DD");
  };

  return { toJalali, toIso };
}
