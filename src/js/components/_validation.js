const NAME = 'name';
const TEXTAREA = 'textarea';
const EMAIL = 'email';
const LENGTH = 'length';

const SUCCESS = 'is-success';
const ERROR = 'is-error';

const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validate = (field, dontAddingClasses) => {
  const value = field.val();
  const type = field.data('validation-type');

  switch (type) {
    case LENGTH:
      return value.length;
    case EMAIL:
      return regexEmail.test(value);
  }
};

$('.js-validation').each((i, form) => {
  form = $(form);
  const fields = form.find('.js-validation-field');
  const button = form.find('[type="submit"]');

  const name = fields.filter(`[data-validation="${NAME}"]`);
  const email = fields.filter(`[data-validation="${EMAIL}"]`);
  const textarea = fields.filter(`[data-validation="${TEXTAREA}"]`);
  const select = form.find('.js-validation-select');

  let valid = (validate(name) && validate(email) && validate(textarea) && validate(select));

  button.attr('disabled', !valid);

  select.each((i, field) => {
    field = $(field);
    const container = field.closest('.js-validation-container');

    field.on('change', e => {
      valid = (validate(name) && validate(email) && validate(textarea) && validate(select));
      container
        .removeClass(ERROR)
        .addClass(SUCCESS);
      button.attr('disabled', !valid);
    });
  });
    
  fields.each((i, field) => {
    field = $(field);
    const container = field.closest('.js-validation-container');
    const errorMessage = container.find('.js-validation-error');
    const fieldName = field.data('validation');
    const type = field.data('validation-type');

    field.on('input', e => {
      console.log(validate(field));
      if (validate(field)) {
        container
          .removeClass(ERROR)
          .addClass(SUCCESS);
        if (type === EMAIL) errorMessage.attr('hidden', false);
      } else {
        container
          .removeClass(SUCCESS)
          .addClass(ERROR);
        if (type === EMAIL) errorMessage.attr('hidden', !field.val().length);
      }

      valid = (validate(name) && validate(email) && validate(textarea) && validate(select));
      button.attr('disabled', !valid);
    });
  });

  form.on('submit', e => {
    if (!valid) e.preventDefault();
  });
});
