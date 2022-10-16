const formatMoney = (money: number | string) => {
  if (money == 0) {
    return 0.0
  }

  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default formatMoney
