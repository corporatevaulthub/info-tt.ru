import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { IMaskInput } from "react-imask";
const CallForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const sendEmail = () => {
    emailjs.sendForm("service_fp0qp2n", "template_calculation", form.current, "76c3fFMb82LKBSmtA").then(
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
    <form ref={form} onSubmit={handleSubmit(sendEmail)} className="relative z-10">
      <div className="mb-5 flex flex-col items-end gap-5 md:mb-10 md:flex-row">
        <div className="relative z-20 w-full max-w-[750px]">
          <div className="mb-6 flex flex-col gap-5 md:flex-row md:gap-[50px]">
            <div className="w-full max-w-[325px]">
              <h3 className="mb-5 font-bold text-dark">Требуется</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" id="delivery" required value="Доставка товара" {...register("required_for", { required: true })} className="focus:ring-0" />
                  <label htmlFor="delivery" className="font-medium">
                    Доставка товара
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="registration" required value="Таможенное оформление" {...register("required_for", { required: true })} className="focus:ring-0" />
                  <label htmlFor="registration" className="font-medium">
                    Таможенное оформление
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="del_and_reg" required value="Доставка и таможенное оформление" {...register("required_for", { required: true })} className="focus:ring-0" />
                  <label htmlFor="del_and_reg" className="font-medium">
                    Доставка и таможенное оформление
                  </label>
                </div>
              </div>
            </div>

            <fieldset className="w-full">
              <div className="mb-5">
                <h3 className="mb-2 font-bold text-dark">Пункт отправки</h3>
                <input required type="text" {...register("shipping_point", { required: true })} placeholder="Страна, Город" className="input w-full" />
              </div>
              <div>
                <h3 className="mb-2 font-bold text-dark">Пункт доставки</h3>
                <input required type="text" {...register("delivery_point", { required: true })} placeholder="Страна, Город" className="input w-full" />
              </div>
            </fieldset>
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <fieldset className="w-full">
              <div className="mb-5 w-full">
                <h3 className="mb-2 font-bold text-dark">Имя</h3>
                <input required type="text" {...register("name", { required: true })} className="input w-full" />
              </div>
              <div className="mb-5 w-full">
                <h3 className="mb-2 font-bold text-dark">Телефон</h3>
                <IMaskInput className="input w-full" mask="+{7}(000)000-00-00" name="phone" required unmask={true} placeholder="Телефон" />
              </div>
              <div className="w-full">
                <h3 className="mb-2 font-bold text-dark">Email</h3>
                <input type="email" required {...register("email", { required: true })} className="input w-full" />
              </div>
            </fieldset>

            <fieldset className="w-full">
              <div className="mb-5">
                <h3 className="mb-2 font-bold text-dark">Наименование товара</h3>
                <input type="text" required {...register("product_name", { required: true })} className="input w-full" />
              </div>
              <div className="mb-5">
                <h3 className="mb-2 font-bold text-dark">Вес</h3>
                <input type="text" {...register("weight", { required: true })} className="input w-full" />
              </div>
              <div>
                <h3 className="mb-2 font-bold text-dark">Объем, м3</h3>
                <input type="text" required {...register("scope", { required: true })} className="input w-full" />
              </div>
            </fieldset>
          </div>
        </div>
        <button className="button w-full justify-center bg-[#E53737] py-2 disabled:pointer-events-none disabled:bg-dark md:w-auto" disabled={loading}>
          {loading ? "Отправка.." : "Отправить"}
        </button>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-[#2E3037]">
        <input type="checkbox" required name="yes_i_understand" className="form-checkbox rounded border-[#D5DAE3] text-primary  focus:ring-0" />
        <span className="text-[12px] font-semibold sm:text-sm">Я согласен с политикой конфиденциальности сайта</span>
      </label>
    </form>
  );
};

export default CallForm;
