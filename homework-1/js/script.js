function sum(a) {

	sum.num += a;

	return sum;
}

sum.num = 0;

sum(1)(2)(3);

console.log(sum.num)