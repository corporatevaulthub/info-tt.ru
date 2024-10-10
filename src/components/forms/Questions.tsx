import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { IMaskInput } from "react-imask";
const QuestionsForms = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const sendEmail = (formData) => {
    emailjs.sendForm("service_fp0qp2n", "contact_form", form.current, "76c3fFMb82LKBSmtA").then(
      (result) => {
        setLoading(false);
        toast.success("Письмо успешно отправлено!", {
          duration: 3000,
          position: "bottom-center",
        });
        reset();
      },
      (error) => {
        toast.error("Упс, что-то пошло не так Попробуйте ещё раз", {
          duration: 3000,
          position: "bottom-center",
        });
      },
    );
    setLoading(true);
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)} className="rounded-[20px] bg-gray-50 p-10">
      <p className="mb-5 font-semibold text-[#252626]">Оставьте ваши контакты и мы ответим на все вопросы</p>
      <fieldset className="mb-4 flex w-full  flex-col items-start gap-2 lg:max-w-full lg:flex-row">
        <input className={`input h-[43px] w-full  ${errors.name && "border-2 border-red-500"}`} placeholder="Имя" {...register("name", { required: true })} />
        <IMaskInput required className="input h-[43px] w-full" mask="+{7}(000)000-00-00" name="phone" placeholder="Телефон" />
      </fieldset>
      <label className="mb-5 flex cursor-pointer items-center gap-2 text-[#2E3037]">
        <input required type="checkbox" {...register("accept", { required: true })} className="form-checkbox rounded border-[#D5DAE3] text-primary  focus:ring-0" />
        <span className="text-[12px] font-semibold sm:text-sm">Я согласен с политикой конфиденциальности</span>
      </label>
      <button className="button h-[43px] w-full justify-center  bg-accent px-[43px] disabled:pointer-events-none disabled:bg-dark" disabled={loading}>
        {loading ? "Отправка.." : "Отправить"}
      </button>
      <Toaster />
    </form>
  );
};

export default QuestionsForms;
