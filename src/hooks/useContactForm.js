import { useState, useEffect } from 'react';

// Configurações do EmailJS - Substitua com suas credenciais
const SERVICE_ID = 'service_ncvxgoc';
const TEMPLATE_ID = 'template_stgdqou';
const PUBLIC_KEY = '4nZlFpVUqWScIMHyI';

// Carrega o script do EmailJS
const loadEmailJSScript = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
  script.async = true;
  document.body.appendChild(script);

  return new Promise((resolve) => {
    script.onload = () => {
      window.emailjs.init(PUBLIC_KEY);
      resolve();
    };
  });
};

export const useContactForm = () => {
  useEffect(() => {
    loadEmailJSScript();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação do assunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }

    // Validação da mensagem
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      const response = await window.emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit
  };
}; 