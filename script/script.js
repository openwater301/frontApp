$(function(){//alert("테스트");
	
	//상품가격 정의
	var food01 = 3000;//떡볶이
	var food02 = 2500;//오뎅
	var food03 = 3000;//김밥
	var food04 = 5000;//튀김

	//상품담는곳(배열)
	var cart = [ ];

	var box = 1;//수량계산
	//var product = " "; //사용자가 선택한 상품

	var deletionGoods; //장바구니 상품삭제시 선택에 사용

	//상품가격 합계
	var total = 0; //독립적인 상품에 수량을 더하거나 빼기했을때의 합계 
	var totalSum = 0; //장바구니에 담긴 모든 상품의 총합계
	
//	const unDefined = undefined;
//	unDefined.props 타입에러 

	//var cart = [ {name: "상품" , src: "images/cook1.JPG" , price: 0} ]//배열초기화
	//var cart = [	];//상품담는곳, 배열초기화    배열 리터럴을 이용하는 경우

	//step1단계 상품선택하기---------------------------------------------------------------------------------
	$("#step1 ul#menu li a img").click(function(){ //상품선택하기

		//step1영역 숨김처리
		$("div#step1").css("display","none");
		//step2화면 보여지게처리
		$("div#step2").css("display","block");

		//선택한 상품이미지 담아놓기
		var product = $(this).attr("src"); //alert(product);
		//$(this)는 ul#menu li a img 선택한 상품이미지이며, 떡볶이나 오뎅이 될 수 있습니다.
		//선택한 상품이미지의 속성src의 값을 변수product에 담아놓습니다.

		console.log(product);//상품이미지가 잘 담겼는지 확인하기!		
		
		//사용자가 어떤상품을 선택했는가에 따라 상품가격을 확인할수 있게 조건문사용
		if(product=="images/cook1.jpg"){
			//떡볶이 가격표시
			$(".total").text("3,000");
			$(".selectedImage").attr("src","images/cook1.JPG");		
		}else if(product=="images/cook2.jpg"){
			//오뎅 가격표시
			$(".total").text("2,500");
			$(".selectedImage").attr("src","images/cook2.JPG");			
		}else if(product=="images/cook3.jpg"){
			//김밥 가격표시
			$(".total").text("3,000");
			$(".selectedImage").attr("src","images/cook3.JPG");			
		}else if(product=="images/cook4.jpg"){
			//튀김 가격표시
			$(".total").text("5,000");
			$(".selectedImage").attr("src","images/cook4.JPG");			
		}
	});

	//step2:장바구니 클릭시 장바구니에 담겨있는 상품들을 보여준다
	$(".buttonArea .cart").click(function(){ 
			$("#step2").css("display","none");
			$("#step3").css("display","block");	
	});

	//step2:담기 클릭시 동작---------------------------------------------------------------------------------
	$("#step2 .buttonArea .push").click(function(){

		//선택한 상품 담아놓기
		var product = $(".selectedImage").attr("src");   

		if(cart.length<3){//카트에 상품이 3개까지만 담을 수 있다
			$("#step2").css("display","none");
			$("#step3").css("display","block");		

							var count = $("#count").text();//수량

							if(product=="images/cook1.JPG"){
								cart.push({name:"떡볶이", src:"images/cook1.JPG", price:3000, ea:count});		
								count = $("#count").text(1);//수량 초기화			
							}else if(product=="images/cook2.JPG"){
								cart.push({name:"오뎅", src:"images/cook2.JPG", price:2500, ea:count});									
								count = $("#count").text(1);							
							}else if(product=="images/cook3.JPG"){
								cart.push({name:"김밥", src:"images/cook3.JPG", price:3000, ea:count});						
								count = $("#count").text(1);							
							}else if(product=="images/cook4.JPG"){
								cart.push({name:"튀김", src:"images/cook4.JPG", price:5000, ea:count});	
								count = $("#count").text(1);							
							}
					
								//장바구니에 담긴 상품이 쌓일 공간
								var shoppingCart = document.getElementsByClassName("shoppingCart_tbody")[0]; //table section
								//메서드는 지정된 클래스 이름을 가진 요소의 자식 컬렉션을 NodeList객체로 반환한다.
								//NodeList 객체는 노드 모음이다. 노드는 인덱스 번호로 접근할 수 있다.	(인덱스=배열은 0부터 시작한다)
								shoppingCart.style.background = "#eee";    

								//장바구니에 담긴 상품개수는 cart.length이다
								var i = cart.length-1;//cart의 갯수에서 1을 뺀값을 cart배열에 넣으면 마지막에 담은 상품이 추가된다. 
										//push 담기할때마다 작동 cart.length가 1개면, 즉 한번 담기하면 1-1=0 0번째 자리에 있는 상품합계가계산되고,
										//push 담기할때마다 작동 cart.length가 2개면, 즉 두번 담기하면 2-1=1 1번째 자리에 있는 상품합계가계산된다.											 
	
									shoppingCart.innerHTML += `
											<tr>
												<td>${i+1}</td>
												<td><img src='${cart[i].src}' width='70' height='70' alt=''/></td>
												<td>${cart[i].name}</td>
												<td>${cart[i].price}원</td>
												<td>${cart[i].ea}</td>
											</tr>
									`;
								//step3:장바구니 총 합계
								totalSum += cart[i].price * cart[i].ea;
								$("#step3 .totalSum, #step4 .totalSum").text(totalSum);


		}else{
			alert("더이상 상품을 담을 수 없습니다."); 
		}
	});

	//step2:선택한 상품 빼기---------------------------------------------------------------------------------	
	$("#step2 #minus").click(function(){

		--box;  //초기값1에서 수량빼기 
		$("#count").text(box);//수량표시
		
		var product = $(".selectedImage").attr("src");

		if(box<1){//수량이 1이하일경우에는 알림메세지를 보여준다
			alert("2개 이상일경우에만 수량빼기가 가능합니다");
			$("#count").text("1");//수량 초기값표기
		}else{
			//상품마다 상품가격에 수량이 작아져서 계산되는 동작
			if(product == "images/cook1.JPG"){
				total -= 3000*1; 
				$(".total").text(total);//떡볶이 가격표시
			}else if(product == "images/cook2.JPG"){
				total -= 2500*1; 
				$(".total").text(total);//오뎅 가격표시
			}else if(product == "images/cook3.JPG"){
				total -= 3000*1; 
				$(".total").text(total);//김밥 가격표시
			}else if(product == "images/cook4.JPG"){
				total -= 5000*1; 
				$(".total").text(total);//튀김 가격표시
			}
		}
		
		
	});

	//step2:선택한 상품 수량더하기---------------------------------------------------------------------------
	$("#step2 #plus").click(function(){ //alert("ok"); 

		++box;  //초기값1에서 수량추가하기 
		$("#count").text(box);//수량표시

		var product = $(".selectedImage").attr("src");//사용자가 선택한 상품

		//상품가격에 수량이 더해져서 계산되는 동작
		if(product == "images/cook1.JPG"){
			total = 3000*box; 
			$(".total").text(total);//떡볶이 가격표시
		}else if(product == "images/cook2.JPG"){
			total = 2500*box; 
			$(".total").text(total);//오뎅 가격표시
		}else if(product == "images/cook3.JPG"){
			total = 3000*box; 
			$(".total").text(total);//김밥 가격표시
		}else if(product == "images/cook4.JPG"){
			total = 5000*box; 
			$(".total").text(total);//튀김 가격표시
		}
	});

	//step3:장바구니에 담은 상품 삭제하기--------------------------------------------------------------------
	$("#step3 .zone p").click(function(){
		if(cart.length>=1){
			alert("장바구니를 비우시겠습니까?");
			$(".shoppingCart_tbody tr").remove();
			cart = [];//초기화
			total = 0; 
			totalSum = 0; 
			$("#step3 .totalSum").text(totalSum);			
		}else{
			alert("담아놓은상품이 없습니다!");					
		}

	});

	//step3,step4:취소하기--------------------------------------------------------------------
	$(".cancle").click(function(){
		if(cart.length>=1){
			alert("취소 하겠습니까?");
			$(".shoppingCart_tbody tr").remove();
			cart = [];//초기화
			alert("카드 갯수: "+cart.length);
			total = 0; 
			totalSum = 0; 
			$(".totalSum").text(totalSum);
			//step3,step4영역 숨김처리
			$("div#step3, div#step4").css("display","none");
			//step1화면 보여지게처리
			$("div#step1").css("display","block");			
		}else{
			alert("취소할상품이 없습니다");		
		}

	});

	$("#buy").click(function(){
		$("#step3").css("display","block");
	});


	//step2, step3:취소하기 클릭시 동작 -------------------------------------------------------------
	$(".gotoList").click(function(){
		$("#step1").css("display","block");
		$("#step2").css("display","none");
		$("#step3").css("display","none");
	});

	//step3:결제하기 클릭시 동작
	$("#step3 #pay").click(function(){
		if(cart.length>=1){
			$("#step1").css("display","none");
			$("#step2").css("display","none");
			$("#step3").css("display","none");
			$("#step4").css("display","block");		
		
		}else{
			alert("결재할 상품이 없습니다.");
		}
	
	});


	//step4단계:카드결재 클릭시 동작
	$("#card").click(function(){
		$("#home").css("display","none");
		$("#step1").css("display","none");
		$("#step2").css("display","none");
		$("#step3").css("display","none");
		$("#step4").css("display","none");
		$("#step5").css("display","block");
		$("#step6").css("display","none");
		$("#step7").css("display","none");
	});
	//step4단계:현금결재 클릭시 동작
	$("#cash").click(function(){
		$("#home").css("display","none");
		$("#step1").css("display","none");
		$("#step2").css("display","none");
		$("#step3").css("display","none");
		$("#step4").css("display","block");
		$("#step5").css("display","none");
		$("#step6").css("display","none");
		$("#step7").css("display","none");
	});
	

	//step5단계:포장 클릭시 동작
	$("#pack").click(function(){
		$("#home").css("display","none");
		$("#step1").css("display","none");
		$("#step2").css("display","none");
		$("#step3").css("display","block");
		$("#step4").css("display","none");
		$("#step5").css("display","none");
		$("#step6").css("display","none");
		$("#step7").css("display","none");
	});

	//step7단계:결재완료 클릭시 동작
	$("#step7").click(function(){

	});

	
});//jquery종료