import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { IMaskInput } from "react-imask";

const SaleForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useRef();
  const phoneInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const sendEmail = (formData) => {
    setLoading(true);

    const phone = phoneInputRef.current.value;

    emailjs.sendForm("service_fp0qp2n", "contact_form", form.current, "76c3fFMb82LKBSmtA").then(
      (result) => {
        const data = {
          FIELDS: {
            TITLE: "Новый лид с формы (Акция)",
            NAME: formData.name,
            PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
            COMMENTS: `
              Комментарий: ${formData.comment},
            `,
          },
        };

        fetch("https://infott.bitrix24.ru/rest/31/33nrxzpn0pft3vv4/crm.lead.add.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              setLoading(false);
              toast.success("Письмо успешно отправлено!", {
                duration: 3000,
                position: "bottom-center",
              });
              reset();
            } else {
              throw new Error("Ошибка при отправке данных на сервер Bitrix");
            }
          })
          .catch((error) => {
            setLoading(false);
            toast.error("Упс, что-то пошло не так при отправке данных на сервер Bitrix. Попробуйте ещё раз.", {
              duration: 3000,
              position: "bottom-center",
            });
            console.error("Ошибка:", error);
          });
      },
      (error) => {
        setLoading(false);
        toast.error("Упс, что-то пошло не так при отправке письма на email. Попробуйте ещё раз.", {
          duration: 3000,
          position: "bottom-center",
        });
        console.error("Ошибка:", error);
      },
    );
  };

  return (
    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
      <fieldset className="mb-4 flex w-full max-w-[540px] flex-wrap items-start gap-2 lg:max-w-full">
        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row">
          <input required className={`input h-[43px] w-full lg:w-[260px] ${errors.name && "border-2 border-red-500"}`} placeholder="Имя" {...register("name", { required: true })} />
          <IMaskInput required className="input h-[43px] w-full lg:w-[260px]" mask="+{7}(000)000-00-00" name="phone" placeholder="Телефон" inputRef={phoneInputRef} />
        </div>
        <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row">
          <input
            className={`input h-[43px] w-full lg:w-[530px] ${errors.comment && "border-2 border-red-500"}`}
            placeholder="Комментарий"
            {...register("comment")}
            style={{ verticalAlign: "bottom" }}
          />
          <button className="button h-[43px] w-full justify-center bg-[#E53737] px-[43px] disabled:pointer-events-none disabled:bg-dark lg:w-[260px]" disabled={loading}>
            {loading ? "Отправка.." : "Отправить"}
          </button>
        </div>
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
