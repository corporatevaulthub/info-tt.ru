import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";
import { IMaskInput } from "react-imask";

const Modal = ({ children }) => {
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
        closeModal();
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

  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const HandleButton = ({ children }) => {
    return <button onClick={openModal}>{children}</button>;
  };

  return (
    <>
      <HandleButton>{children}</HandleButton>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/45" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden  bg-white px-6 py-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="mb-2 text-center text-xl font-semibold text-dark">
                    Оставьте свои данные1
                  </Dialog.Title>
                  <button className="absolute right-5 top-5" onClick={closeModal}>
                    <X />
                  </button>
                  <p className="mb-5 text-center">И мы скоро свяжемся с вами!</p>
                  <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                    <fieldset className="mb-4 flex w-full flex-col items-start gap-3">
                      <input className={`input h-[43px] w-full bg-gray-50 ${errors.name && "border-2 border-red-500"}`} placeholder="Имя" {...register("name", { required: true })} />
                      <IMaskInput required className="input h-[43px] w-full bg-gray-50" mask="+{7}(000)000-00-00" name="phone" placeholder="Телефон" />
                    </fieldset>
                    <label className="mb-5 flex cursor-pointer items-center gap-2 text-[#2E3037]">
                      <input required type="checkbox" {...register("accept", { required: true })} className="form-checkbox rounded border-[#D5DAE3] text-primary  focus:ring-0" />
                      <span className="text-[12px] font-semibold sm:text-sm">Я согласен с политикой конфиденциальности</span>
                    </label>
                    <button className="button h-[43px] w-full justify-center bg-accent  px-[43px] hover:bg-accent/90 disabled:pointer-events-none disabled:bg-dark" disabled={loading}>
                      {loading ? "Отправка.." : "Отправить"}
                    </button>
                    <Toaster />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
