import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { IMaskInput } from "react-imask";

const SaleForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const sendEmail = (formData) => {
    // Отправляем письмо с помощью emailjs
    emailjs.sendForm("service_fp0qp2n", "contact_form", form.current, "76c3fFMb82LKBSmtA").then(
      (result) => {
        // Если письмо успешно отправлено
        // Отправляем данные в Битрикс24
        const leadData = {
          FIELDS: {
            TITLE: "Новый лид",
            NAME: formData.name,
            EMAIL: [{ VALUE: formData.email, VALUE_TYPE: "WORK" }],
            PHONE: [{ VALUE: formData.phone, VALUE_TYPE: "WORK" }],
            // Добавьте сюда другие поля формы, если необходимо
          },
        };

        fetch("https://infott.bitrix24.ru/rest/31/33nrxzpn0pft3vv4/crm.lead.add.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leadData),
        }).then((response) => {
          if (response.ok) {
            // Если данные успешно отправлены в Битрикс24
            setLoading(false);
            toast.success("Письмо успешно отправлено и данные переданы в Битрикс24!", {
              duration: 3000,
              position: "bottom-center",
            });
            reset();
          } else {
            // Если возникла ошибка при отправке данных в Битрикс24
            toast.error("Упс, что-то пошло не так. Попробуйте ещё раз", {
              duration: 3000,
              position: "bottom-center",
            });
          }
        });
      },
      (error) => {
        // Если произошла ошибка при отправке письма
        toast.error("Упс, что-то пошло не так. Попробуйте ещё раз", {
          duration: 3000,
          position: "bottom-center",
        });
      },
    );
    setLoading(true);
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
      <fieldset className="mb-4 flex w-full max-w-[540px] flex-col items-start gap-2 lg:max-w-full lg:flex-row">
        <input className={`input h-[43px] w-full lg:w-[260px] ${errors.name && "border-2 border-red-500"}`} placeholder="Имя" {...register("name", { required: true })} />
        <IMaskInput required className="input h-[43px] w-full lg:w-[260px]" mask="+{7}(000)000-00-00" name="phone" placeholder="Телефон" />
        <button className="button h-[43px] w-full justify-center  bg-[#E53737] px-[43px] disabled:pointer-events-none disabled:bg-dark sm:w-auto" disabled={loading}>
          {loading ? "Отправка.." : "Отправить"}
        </button>
      </fieldset>
      <label className="flex cursor-pointer items-center gap-2 text-[#2E3037]">
        <input required type="checkbox" {...register("accept", { required: true })} className="form-checkbox rounded border-[#D5DAE3] text-primary  focus:ring-0" />
        <span className="text-[12px] font-semibold sm:text-sm">Я согласен с политикой конфиденциальности</span>
      </label>
      <Toaster />
    </form>
  );
};

export default SaleForm;
