export default function(){
  this.transition(
    this.withinRoute('procedure.step'),
    this.use('toLeft'),
    this.debug()
  );
}
