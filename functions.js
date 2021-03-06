const functions = {
    superCatalan(n){
        if(n<=2)return 1
        let n1 = 1
        let n2 = 1
        let n3 = 1
        for(let x=3;x<=n;x++){
            n3 = (3*(2*x-3)*n2-(x-3)*n1)/x
            n1 = n2
            n2 = n3
        }
        return n3
    },
    factorial(n){
        if(n<=1)return 1
        let x = 1
        for(let a=2+n%1;a<=n;a++)x*=a
        return x
    },
    doubleFactorial(n){
        if(n<=1)return 1
        let x = 1
        while(n>=2){
            x*=n
            n-=2
        }
        return x
    },
    alternatingFactorial(n){
        if(n<=1)return 1
        n+=1
        let x = 1
        if(n%2){
            for(let a=2;a<n;a++)x+=functions.factorial(a)*(a%2==1?-1:1)
        }else{
            for(let a=3;a<n;a++)x+=functions.factorial(a)*(a%2==0?-1:1)
        }
        return x-2
    },
    superFactorial(n){
        if(n<=1)return 1
        let x = 1
        let y = 1
        for(let a=2;a<=n;a++){
            x*=a
            y*=x
        }
        return y
    },
    centralFactorial(n){
        return 1/360*n*(n-1)*(n-2)*(2*n-1)*(2*n-3)*(5*n+1)
    },
    catalan(n){
        if(n<=1)return 1
        return (2**n*functions.doubleFactorial(2*n-1))/functions.factorial(n+1)
    },
    binomialCoefficient(a,b){
        return functions.factorial(a)/(functions.factorial(b)*functions.factorial(a-b))
    },
    sigma(func,min,max,...inputs){
        let num = 0
        for(let x=min;x<=max;x++)num+=func(x,...inputs)
        return num
    },
    baxter(n){
        return functions.sigma(function(k,n){
            return functions.binomialCoefficient(n+1,k-1)*functions.binomialCoefficient(n+1,k)*
                functions.binomialCoefficient(n+1,k+1)/(functions.binomialCoefficient(n+1,1)*
                functions.binomialCoefficient(n+1,2))
        },1,n,n)
    },
    lucasNumber(n){
        if(n==0)return 2
        if(n==1)return 1
        let n1 = 2
        let n2 = 1
        let n3 = 1
        for(let x=2;x<=n;x++){
            n3 = n1+n2
            n1 = n2
            n2 = n3
        }
        return n3
    },
    triangular(n){
        return n*(n+1)/2
    },
    stirlingPartitionNumber(n,k){
        let num = 0
        for(let i=0;i<n;i++)num+=(-1)**i*functions.binomialCoefficient(k,i)*(k-i)**n
        return Math.round(1/functions.factorial(k)*num)
    },
    beta(p,q){
        return functions.factorial(p-1)*functions.factorial(q-1)/functions.factorial(p+q-1)
    },
    gamma(n){
        if(Math.floor(n)==n&&n>0)return functions.factorial(n-1)
        return functions.integral(function(dt,t,n){
            return Math.log(1/t)**(n-1)*dt
        },1e5,1,0,n)
    },
    integral(func,steps,max,min,...inputs){
        let div = 1/steps*(max-min)
        let num = 0
        for(let x=1;x<=steps;x++)num+=func(div,div*x,...inputs)
        return num
    },
    sineIntegral(n){
        if(n==0)return 1
        return functions.integral(function(dt,t){return Math.sin(t)/t*dt},100,n,0)
    },
    aperyNumber(n){
        return functions.sigma(function(k,n){
            return (functions.binomialCoefficient(n,k)**2)*(functions.binomialCoefficient(n+k,k)**2)
        },0,n,n)
    },
    agm(a,b){
        while(a.toFixed(9)!=b.toFixed(9)){
            let c = (a+b)/2
            let d = Math.sqrt(a*b)
            a = c
            b = d
        }
        return a
    },
    harmonicNumber(n){
        return functions.sigma(function(x){return 1/x},1,n)
    },
    derangement(n){
        if(n<=0)return 1
        if(n<=1)return 0
        let n1 = 1
        let n2 = 0
        let n3 = 0
        for(let x=2;x<=n;x++){
            n3 = (x-1)*(n1+n2)
            n1 = n2
            n2 = n3
        }
        return n
    },
    kFunction(n){
        let num = 1
        for(let x=2;x<=n;x++)num*=x**x
        return num
    },
    upperIncompleteGamma(a,x){
        return a
    },
    upperGamma(a,z){
        return functions.gamma(a)
    },
    motzkin(n){
        if(n<2)return 1
        let n1 = 1
        let n2 = 1
        let n3 = 0
        for(let x=2;x<=n;x++){
            n3 = (2*x+1)/(x+2)*n2+(3*x-3)/(x+2)*n1
            n1 = n2
            n2 = n3
        }
        return n3
    },
    ballotNumber(n){
        return functions.motzkin(n+1)-functions.motzkin(n)
    },
    digitalSum(n){
        let num = 0
        for(let x=0;x<Math.ceil(Math.log10(n));x++){
            let pow = 10**x
            num+=(n%(pow*10)-n%pow)/pow
        }
        return num
    },
    digitalRoot(n){
        let num = n
        while(num>=10){
            num = functions.digitalSum(num)
        }
        return num
    },
    bracketFunction(n){
        return Math.round(2*3**(n/2)*Math.sin((1-5*n)*Math.PI/6))
    },
    primes(n){
        // generate all primes up to n
        n = Math.floor(n)
        let arr = [2,3,5,7,11,13]
        if(n<17)return arr.filter(a=>a>=n)
        let t = Date.now()
        for(let num=17;num<=n;num++){
            if(num%2>0&&num%3>0&&num%5>0&&num%7>0&&num%11>0&&num%13>0)arr.push(num)
        }
        console.log(Date.now()-t)
        t = Date.now()
        for(let x=5;x<arr.length;x++){
            arr = arr.filter((a,b)=>b==x||a%arr[x]>0)
        }
        console.log(Date.now()-t)
        return arr
    },
    composites(n){
        let primes = functions.primes(Math.floor(n))
        return ([...Array(Math.floor(n)).keys(),n]).slice(4).filter(a=>!primes.includes(a))
    },
    composite(n){
        if(n==2)return 6
        if(n<5)return functions.composites(n*5)[n-1]
        if(n<10)return functions.composites(n*3)[n-1]
        if(n<100)return functions.composites(n*2)[n-1]
        if(n<1000)return functions.composites(n*1.5)[n-1]
        if(n<1e5)return functions.composites(n*1.2)[n-1]
        return functions.composites(n*1.15)[n-1]
    },
    conwayGuy(n){
        let ns = [0,1,2,4]
        if(ns[n])return ns[n]
        
    },
    abundant(n){
        
    },
    fibonacci(n){
        if(n==0)return 0
        if(n==1)return 1
        let n1 = 0
        let n2 = 1
        let n3 = 1
        for(let x=2;x<=n;x++){
            n3 = n1+n2
            n1 = n2
            n2 = n3
        }
        return n3
    },
    risingFactorial(a,b){
        return functions.factorial(a+b-1)/functions.factorial(a-1)
    },
    eulerNumber(n){
        return 2**(2*n-1)*functions.sigma(function(k,n){
            return (-1)**k*functions.stirlingPartitionNumber(n,k)/(k+1)*(3*functions.risingFactorial(1/4,k)-functions.risingFactorial(3/4,k))
        },1,n,n)
    },
    duchonNumber(n){
        return functions.sigma(function(i,n){
            return 1/(5*n+i+1)*functions.catalan()
        },0,n,n)
    },
    ramanujanPrime(n){
        let primes = functions.primes(n*10)
        for(let x=0;x<primes.length;x++){
            if(x-functions.primes(primes[x]/2).length>=n)return primes[x]
        }
        return 0
    },
    divisors(n){
        if(n==0)return []
        let max = Math.floor(Math.sqrt(n))
        let div = [[1,n]]
        for(let x=2;x<=max;x++){
            if(n/x%1==0)div.push([x,n/x])
        }
        return div
    },
    concat(...n){
        let a = n[0]
        for(let x=1;x<n.length;x++){
            if(a==0)a=n[x]
            else a = 10**Math.ceil(Math.log10(n[x]))*a+n[x]
        }
        return a
    },
    ehsNumbers(n){
        let nums = ([...Array(n).keys(),n]).slice(8)
        let primes = mprimes
        nums = nums.filter(num=>{
            let good = false
            for(let x=0;x<primes.length;x++){
                if(primes[x]%num==1)continue;
                let a = 1
                for(let y=2;y<=num;y++)a=(a*y)%primes[x]
                if((a+1)%primes[x]==0){
                    console.log(num,primes[x])
                    good = true
                    break;
                }
            }
            return good
        })
        return nums
    },
    ehs(n){
        
    },
    bitwiseNot(n){
        let num = n.toString(2)
        let a = 0
        for(let x=num.length-1;x>=0;x--)a+=(num[x]=="0"?(2**(num.length-1-x)):0)
        return a
    },
    bitwiseOr(x,y){
        return x|y
    },
    bitwiseAnd(x,y){
        return x&y
    },
    primorial(n){
        let num = 1
        for(let x=0;x<mprimes.length;x++){
            if(mprimes[x]>n)return num
            num*=mprimes[x]
        }
        return 1
    },
    aliquotSum(n){
        if(n==1)return 0
        return functions.divisors(n).flat().filter(a=>a<n).reduce((p,a)=>p+a,0)-(Math.sqrt(n)%1==0?Math.sqrt(n):0)
    },
    baseDecimal(n,b){
        let a = []
        while(n>0){
            a.push(n%b)
            n=Math.floor(n/b)
        }
        return a.reverse()
    },
    brazilianNumber(n){
        let nums = []
        let max = Math.floor(n*1.25**(Math.sqrt(n))+6)
        for(let x=7;x<=max;x++){
            if(x%2==0){
                nums.push(x)
                continue;
            }
            let good = false
            let xp = x+1
            for(let y=2;y<x-1;y++){
                let g = true
                let b = functions.baseDecimal(x,y)
                for(let z=1;z<b.length;z++){
                    if(b[z]!=b[z-1])g=false
                }
                if(g){
                    good=true
                    break;
                }
            }
            if(good)nums.push(x)
        }
        return nums[n-1]
    }
}