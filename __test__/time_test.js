module.exports = function(time){
  const t = time()
  const t_f = t.format();
  const t_y = t.format('YYYY-MM')
  const t_h = t.format('hh:mm:ss')

  console.log('t_f', t_f)
  console.log('t_h', t_h)
  console.log('t_y', t_y)

  const M = t.add(2019,'Y').format()
  console.log(M);
}