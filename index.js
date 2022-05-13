const elements = {}
function getEle(x){
    if(!elements[x])elements[x] = document.getElementById(x)
    return elements[x]
}

function createEle(x,options){
    let ele = document.createElement(x)
    if(options.parent)options.parent.appendChild(ele)
    if(options.id){
        elements[options.id]=ele
        ele.id=options.id
    }
    if(options.text)ele.innerHTML = options.text
    return ele
}

function format(num,p=2){
    if(num===undefined)return "undefined"
    if(num==Infinity)return "Infinity"
    if(Number.isNaN(num))return "NaN"
    if(num<1e3)return num.toFixed(p)
    if(num<1e9)return Math.floor(num).toLocaleString("en-US")
    let e = Math.floor(Math.log10(num))
    let m = num/10**e
    if(m.toFixed(p)==("10."+"0".repeat(p))){
        e++
        m=1
    }
    return m.toFixed(p)+"e"+e
}

function formatFunction(name){
    let n = name[0].toUpperCase()
    for(let x=1;x<name.length;x++){
        if(name[x].replace(/[^A-Z]/g,"").length==1)n+=" "
        n+=name[x]
    }
    return n
}

const inputElements = []
function addInput(){
    let num = inputElements.length
    let div = createEle("div",{parent:getEle("inputs")})
    let i1 = createEle("input",{parent:div})
    createEle("span",{parent:div,text:" to "})
    let i2 = createEle("input",{parent:div})
    createEle("span",{parent:div,text:"&nbsp;&nbsp;"})
    let b = createEle("button",{parent:div,text:"Delete"})
    b.addEventListener("click",()=>{
        div.remove()
        inputElements.splice(num,1)
    })
    inputElements.push({div,i1,i2,b})
}

function getInputs(needed){
    if(inputElements.length<needed)return "less"
    let arr = []
    for(let x=0;x<needed;x++){
        let i1 = Number(inputElements[x].i1.value)
        if(Number.isNaN(i1))i1 = 0
        let i2 = Number(inputElements[x].i2.value)
        if(Number.isNaN(i2))i2 = 0
        arr.push([i1,i2])
    }
    return arr
}

function generateValues(func,nums){
    let vals = {}
    let done = false
    for(let x=0;x<nums.length;x++){
        if((typeof nums[x]) == "number")continue;
        if(nums[x][0]==nums[x][1]){nums[x] = nums[x][0]}
        else{
            for(let y=nums[x][0];y<=nums[x][1];y++){
                vals = {...vals,...generateValues(func,nums.slice(0,x).concat(y).concat(nums.slice(x+1)))}
            }
            done = true
            break;
        }
    }
    if(!done){
        if(!functionResultCache[func.name])functionResultCache[func.name]=[]
        if(!functionResultCache[func.name][nums.join(",")])functionResultCache[func.name][nums.join(",")] = func(...nums)
        vals[nums.join(", ")] = functionResultCache[func.name][nums.join(",")]
    }
    return vals
}

function clearOutput(){
    getEle("out").innerHTML = ""
}

const bad = ["sigma","integral","motzkin","upperIncompleteGamma","composites","primes","stirlingPartitionNumber",
             "upperGamma","binomialCoefficient","triangular","conwayGuy","abundant","eulerNumber","divisors",
             "ramanujanPrime","duchonNumber","ehs","ehsNumbers","baseDecimal"]

const functionResultCache = {}

function generateFunctionList(){
    let keys = Object.keys(functions).filter(a=>!bad.includes(a)).sort((a,b)=>a.localeCompare(b))
    let colAmt = 4
    let rowAmt = Math.ceil(keys.length/colAmt)
    for(let x=0;x<rowAmt;x++){
        if(!keys[x*colAmt])break;
        let row = createEle("tr",{parent:getEle("functions")})
        for(let y=0;y<colAmt;y++){
            if(!keys[x*colAmt+y])break;
            let col = createEle("td",{parent:row})
            let b = createEle("button",{parent:col})
            b.className = "func"
            let len = functions[keys[x*colAmt+y]].length
            b.innerHTML = formatFunction(keys[x*colAmt+y]) + "<br>" + (len?("Requires "+len+" input"+(len==1?"":"s")):"Uses infinite inputs")+"."
            b.addEventListener("click",()=>{
                let nums = generateValues(functions[keys[x*colAmt+y]],getInputs(len||inputElements.length))
                let s = ""
                Object.keys(nums).forEach(a=>{
                    s+=a+": "+format(nums[a])+"<br>"
                })
                getEle("out").innerHTML = s.slice(0,-4)
            })
        }
    }
}

window.onload = () => generateFunctionList()