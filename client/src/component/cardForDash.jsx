import style from './cardForDash.module.css';

export default function CardForDash({mainheading, result, about, dollar, styleForProfit}){
    

    return(
        <div className={style.cardForDash}> 
            <h3 className={style.h33}>{mainheading}</h3>
            <h2 style={{color:styleForProfit}} className={style.h22}>{dollar}{result}</h2>
            <p className={style.p1}>{about}</p>
        </div>
    )
}
