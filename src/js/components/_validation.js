;(() => {

  const NAME = 'name';
  const EMAIL = 'email';
  const LENGTH = 'length';

  const SUCCESS = 'is-success';
  const ERROR = 'is-error';

  const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validate = field => {
    field = $(field);
    const container = field.closest('.js-validation-container');
    const type = field.data('validation-type');
    const value = field.val();

    let valid = false;

    switch (type) {
      case LENGTH:
        valid = value.length;
        break;
      case EMAIL:
        valid = regexEmail.test(value);
        break;
    }

    if (valid) {
      container
        .removeClass(ERROR)
        .addClass(SUCCESS);
    } else {
      container
        .removeClass(SUCCESS)
        .addClass(ERROR);
    }

    return valid;
  };

  $('.js-validation').each((i, form) => {
    form = $(form);
    const fields = form.find('.js-validation-field');
    const message = form.find('.js-validation-message');

    const name = fields.filter(`[data-validation="${NAME}"]`);
    const email = fields.filter(`[data-validation="${EMAIL}"]`);
    
    fields.each((i, field) => {
      field = $(field);
      const fieldName = field.data('validation');

      field.on('input', e => {
        validate(field);
        if (fieldName === NAME || fieldName === EMAIL) {
          message.attr('hidden', !(name.val().length && email.val().length));
        }
      });
    });

    form.on('submit', e => {
      let valid = true;
      fields.each((i, field) => {
        if (validate(field)) return;
        valid = false;
      });
      if (!valid) e.preventDefault();
    });
  });

})();
