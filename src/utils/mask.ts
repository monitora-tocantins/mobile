export function maskCpf(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export const formatCurrency = (value: number) => {
  const preValue = !value ? 0 : value;
  const number = !parseFloat((preValue / 100).toString())
    ? preValue.toString().replace(/\./g, ',')
    : parseFloat(preValue.toString()).toFixed(0).toString().replace(/\./g, ',');

  return `${number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export function nameInitials(name: string) {
  name = name.replace(/\s(de|da|dos|das)\s/g, ' ');
  var initials = name.match(/\b(\w)/gi);
  const nameIni = initials
    ?.splice(0, initials.length - 1)
    .join('')
    .toUpperCase();
  return nameIni;
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string, width: number, height: number) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width,
      height,
    },
    children: `${name.replace(/\s(de|da|dos|das)\s/g, ' ').split(' ')[0][0]}`,
  };
}

export function validateCpf(cpf: string) {
  let Soma;
  let Resto;
  Soma = 0;

  if (cpf === '00000000000') {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }
  if (Resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }
  return true;
}

export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
