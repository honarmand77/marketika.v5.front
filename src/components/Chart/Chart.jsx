import React ,{useRef} from 'react'
import { 
    ChartContainer,
    ChartHeader,
    ChartItems

 } from './Chart.style'
export default function Chart({ title , Items}) {
    const categoriesRef = useRef(null); // برای اسکرول کردن

    // هندلر درگ موس
    const handleMouseDown = (e) => {
      const container = categoriesRef.current;
      container.isDown = true; // فعال کردن درگ
      container.startX = e.pageX - container.offsetLeft; // ذخیره موقعیت اولیه
      container.scrollLeftStart = container.scrollLeft; // ذخیره مقدار اسکرول اولیه
    };
  
    const handleMouseMove = (e) => {
      const container = categoriesRef.current;
      if (!container.isDown) return; // در صورتی که درگ فعال نیست، کاری نکن
      e.preventDefault();
      const x = e.pageX - container.offsetLeft; // موقعیت جدید موس
      const walk = (x - container.startX) * 1.5; // محاسبه فاصله اسکرول (1.5 ضریب سرعت)
      container.scrollLeft = container.scrollLeftStart - walk; // اعمال اسکرول
    };
  
    const handleMouseUp = () => {
      const container = categoriesRef.current;
      container.isDown = false; // غیرفعال کردن درگ
    };
  

    let bg = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    
  return (
    <ChartContainer className='ChartContainer' ref={categoriesRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}>
        <ChartHeader className='ChartHeader'>
            <h2>{title}</h2>

        </ChartHeader>
            {
                Items.map((item , index) => (
                    <ChartItems>
                <span style={{maxHeight:'100%',height:`${item.value}mm`, background:`${bg === "#fff" ?  "#eee" : bg +`${item.value >= 100 ? "99" : item.value}` }`}}><strong>{item.value}%</strong></span>
                <h3>{item.date}</h3>
            </ChartItems>        
                ))
            }
            
    </ChartContainer>
  )
}
