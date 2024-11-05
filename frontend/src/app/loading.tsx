export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <div className="preloader-area position-fixed text-center" style={{backgroundColor:'white'}}>
        <div className="loader">
          <div className="waviy">
            <span style={{color:'grey',fontWeight:'normal'}}>S</span>
            <span style={{color:'grey',fontWeight:'normal'}}>t</span>
            <span style={{color:'grey',fontWeight:'normal'}}>a</span>
            <span style={{color:'grey',fontWeight:'normal'}}>n</span>
            <span style={{color:'grey',fontWeight:'normal'}}>d</span>
            <span style={{color:'grey',fontWeight:'normal'}}>a</span>
            <span style={{color:'grey',fontWeight:'normal'}}>r</span>
            <span style={{color:'grey',fontWeight:'normal'}}>d</span>
            <span>-</span>
            <span style={{color:'grey',fontWeight:'normal'}}>C</span>
            <span style={{color:'grey',fontWeight:'normal'}}>a</span>
            <span style={{color:'grey',fontWeight:'normal'}}>r</span>
            <span style={{color:'grey',fontWeight:'normal'}}>p</span>
            <span style={{color:'grey',fontWeight:'normal'}}>e</span>
            <span style={{color:'grey',fontWeight:'normal'}}>t</span>
            <span style={{color:'grey',fontWeight:'normal'}}>s</span>
          </div>
        </div>
      </div>
    </>
  );
}
