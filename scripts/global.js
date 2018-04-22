//文档完全加载后运行某函数
function addLoadEvent(func)
{
	var oldonload = window.onload;
	if(typeof window.onload != 'function')
	{
		window.onload = func;
	}
	else
	{
		window.onload = function()
		{
			oldonload();
			func();
		}
	}
}
//在某元素之后插入
function insertAfter(newElement,targetElement)
{
	var parent = targetElement.parentNode;

	if(parent.lastChild == targetElement)
	{
		parent.appendChild(newElement);
	}
	else
	{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//增加类
function addClass(element,value)
{
	if(!element.className)
	{
		element.className = value;
	}
	else
	{
		newClassName = element.className +" "+ value;
		element.className = newClassName;
	}
}
//页面突出显示
function highlightPage()
{
	var headers = document.getElementsByTagName('header');
	var navs = headers[0].getElementsByTagName('nav');
	var links = navs[0].getElementsByTagName('a');

	links[0].className = '';
	for(var i=0;i<links.length;i++)
	{
		var linkurl = links[i].getAttribute('href');

		if(window.location.href.indexOf(linkurl) != -1)
		{
			links[i].className = 'here';
		}
	}
}

//实现幻灯片功能
var timer;
function moveElement(elementId,finalx,finaly,interval)
{
	var elem = document.getElementById(elementId);
	clearInterval(timer);
	timer = setInterval(function(){
		if( !elem.style.left) {elem.style.left = 0;}
		if( !elem.style.top) {elem.style.top = 0;}
		var xpos = parseInt(elem.style.left);
		var ypos = parseInt(elem.style.top);
		if(xpos == finalx && ypos == finaly)
		{
			clearInterval(timer);
		}
		if(xpos < finalx)
		{
			var dist = Math.ceil((finalx - xpos)/10);
			xpos += dist;
		}
		if(xpos > finalx)
		{
			var dist = Math.ceil((xpos - finalx)/10);
			xpos -= dist;
		}
		if(ypos < finaly)
		{
			var dist = Math.ceil((finaly - ypos)/10);
			ypos += dist;
		}
		if(ypos > finaly)
		{
			var dist = Math.ceil((finaly - ypos)/10);
			ypos += dist;
		}
		elem.style.left = xpos + 'px';
		elem.style.top = ypos + 'px';
	}, interval);
}

// function moveElement(elementId,finalx,finaly,interval)
// {
// 	var elem = document.getElementById(elementId);
// 	//若left和top值未被设置，则默认为0
// 	if( !elem.style.left) {elem.style.left = 0;}
//  	if( !elem.style.top) {elem.style.top = 0;}
// 	var xpos = parseInt(elem.style.left);
// 	var ypos = parseInt(elem.style.top);
// 	if(elem.movement)
// 	{
// 		clearTimeout(elem.movement);
// 	}
// 	if(xpos == finalx && ypos == finaly)
// 	{
// 		return true;
// 	}
// 	var dist;
// 	if(xpos < finalx)
// 	{
// 		dist = Math.ceil((finalx - xpos)/10);
// 		xpos += dist;
// 	}
// 	if(xpos > finalx)
// 	{
// 		dist = Math.ceil((xpos - finalx)/10);
// 		xpos -= dist;
// 	}
// 	if(ypos < finaly)
// 	{
// 		dist = Math.ceil((finaly - ypos)/10);
// 		ypos += dist;
// 	}
// 	if(ypos > finaly)
// 	{
// 		dist = Math.ceil((ypos - finaly)/10);
// 		ypos -= dist;
// 	}
// 	elem.style.left = xpos + 'px';
// 	elem.style.top = ypos + 'px';
//     var repeat = "moveElement('"+elementId+"',"+finalx+","+finaly+","+interval+")";
//     elem.movement = setTimeout(repeat,interval);
// }

function prepareShow()
{
	//创建幻灯片并准备相应链接
	if(!document.getElementById('intro')) return false;
	var intro = document.getElementById('intro');
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');

	var frame = document.createElement('img');
	frame.setAttribute('id', 'frame');
	frame.setAttribute('src','images/frame.gif');
	slideshow.appendChild(frame);

	var preview = document.createElement('img');
	preview.setAttribute('src', 'images/slideshow.gif');
	preview.setAttribute('id', 'preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	//循环遍历intro段落中的链接，并根据鼠标所在的链接来移动preview元素
	var links = document.getElementsByTagName('a');
	var destination;
	for(var i=0; i<links.length; i++)
	{
		links[i].onmouseover = function()
		{
			destination = this.getAttribute('href');
			if(destination.indexOf('index.html') != -1)
			{
				moveElement('preview', 0, 0, 5);
			}
			if(destination.indexOf('about.html') != -1)
			{
				moveElement('preview', -150, 0, 5);
			}
			if(destination.indexOf('photos.html') != -1)
			{
				moveElement('preview', -300, 0, 5);
			}
			if(destination.indexOf('live.html') != -1)
			{
				moveElement('preview', -450, 0, 5);
			}
			if(destination.indexOf('contact.html') != -1)
			{
				moveElement('preview', -600, 0, 5);
			}
		}
	}
}

//about
function showSection(id)
{
	var sections = document.getElementsByTagName('section');
	for(var i = 0; i < sections.length; i++)
	{
		if(sections[i].getAttribute('id') != id)
		{
			sections[i].style.display ='none';
		}
		else
		{
			sections[i].style.display ='block';
		}
	}
}

function prepareInternalnav()
{
	var article = document.getElementsByTagName('article');
	if(article.length == 0) return false;
	var nav = article[0].getElementsByTagName('nav');
	if(nav.length == 0) return false;
	var links = nav[0].getElementsByTagName('a');
	for(var i = 0; i < links.length; i++)
	{
		//开头的#表示内部链接，使用split方法提取每一部分的id值
		var sectionId = links[i].getAttribute('href').split('#')[1];
		//在页面加载后，需要默认隐藏所有部分
		document.getElementById(sectionId).style.display = 'none';
		links[i].destination = sectionId;
		links[i].onclick = function()
		{
			showSection(this.destination);
		}
	}
}


//photo
function showPic(whichpic)
{
	var source = whichpic.getAttribute('href');
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute('src',source);

	var text = whichpic.getAttribute('title');
	var description = document.getElementById('description');
	if(description.firstChild.nodeType == 3)
	{
		description.firstChild.nodeValue = text;
	}
	return false;
}

function preparePlaceholder()
{
	if(!document.getElementById('imagegallery')) return false;
	var placeholder = document.createElement('img');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('src','images/placeholder.gif');

	var description = document.createElement('p');
	description.setAttribute('id','description');

	var desctext = document.createTextNode('选择一张图片');
	description.appendChild(desctext);

	var gallery = document.getElementById('imagegallery');
	insertAfter(description, gallery);
	insertAfter(placeholder, description);
}

function prepareGallery()
{
	if(!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++)
	{
		links[i].onclick = function()
		{
			return showPic(this);
		}
	}
}

//live
function stripeTables()
{
	if(!document.getElementsByTagName('table')) return false;
	var table = document.getElementsByTagName('table');
	for(var i = 0; i < table.length; i++)
	{
		var rows = table[i].getElementsByTagName('tr');
		var odd = false;
		for(var j = 0; j < rows.length; j++)
		{
			if(odd == true)
			{
				addClass(rows[j], 'odd');
				odd = false;
			}
			else
			{
				odd = true;
			}
		}
	}
}

function highlightRows()
{
	if(!document.getElementsByTagName('tr')) return false;
	var rows = document.getElementsByTagName('tr');
	for(var i = 0; i < rows.length; i++)
	{
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function()
		{
			addClass(this, 'highlight');
		}
		rows[i].onmouseout = function()
		{
			this.className = this.oldClassName;
		}
	}
}

function displayAbbr()
{
	if(!document.getElementsByTagName('abbr')) return false;
	var abbr = document.getElementsByTagName('abbr');
	var defs = new Array();

	for(var i = 0 ;i < abbr.length; i++)
	{
		var definition = abbr[i].getAttribute('title');
		var key = abbr[i].lastChild.nodeValue;
		defs[key] = definition;
	}

	var dlist = document.createElement('dl');
	for(var key in defs)
	{
		var definition = defs[key];
		var dt = document.createElement('dt');
		var dttext = document.createTextNode(key);
		dt.appendChild(dttext);
		var dd = document.createElement('dd');
		var ddtext = document.createTextNode(definition);
		dd.appendChild(ddtext);
		dlist.appendChild(dt);
		dlist.appendChild(dd);
	}

	if(dlist.childNodes.length < 1) return false;
	var header = document.createElement('h3');
	var headertext = document.createTextNode('缩略词');
	header.appendChild(headertext);
	var article = document.getElementsByTagName('article')[0];
	article.appendChild(header);
	article.appendChild(dlist);
}

//contact
//点击label就突出input
function focusLabels()
{
	if(!document.getElementsByTagName('label')) return false;
	var label = document.getElementsByTagName('label');
	for(var i = 0;i < label.length; i++)
	{
		//若label[i]没有for属性，则进入下一次循环
		if(!label[i].getAttribute('for')) continue;
		label[i].onclick = function()
		{
			var id = this.getAttribute('for');
			//确保存在相应的表单字段
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}

//表单验证
function isFilled(field)
{
	//通过检查去掉空格之后的value属性的length属性，就可以知道value中是否没有任何字符
	if(field.value.replace(' ','').length == 0) return false;
	//通过比较value属性与placeholder属性，就可以知道用户是否对占位符文字一字未动
	var placeholder = field.getAttribute('placeholder');
	return (field.value != placeholder);
}

function isEmail(field)
{
	return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1);
}

function validateForm(whichform)
{
	for(var i = 0; i < whichform.elements.length; i++)
	{
		var element = whichform.elements[i];
		// if(element.required == 'required')
		// {
		// 	if(!isFilled(element))
		// 	{
		// 		console.log('hehe');
		// 		alert('请输入' + element.name + '信息');
		// 		return false;
		// 	}
		// } 
		if(element.name == 'email')
		{
			if(!isEmail(element))
			{
				alert('电子邮件必须是一个有效的地址');
				return false;
			}
		} 
	}
	return true;
}

//提交表单
function displayAjaxLoading(element)
{
	while(element.hasChildNodes())
	{
		element.removeChild(element.lastChild);
	}
	var content = document.createElement('img');
	content.setAttribute('src', 'images/loading.gif');
	content.setAttribute('alt', 'loading...');
	element.appendChild(content);
}

function submitFormWithAjax(whichform, target)
{
	//1.创建ajax对象
	var request;
	//非IE6
	if(window.XMLHttpRequest)
	{
		request = new XMLHttpRequest();
	}
	//IE6
	else
	{
		request = new ActiveXObject("Microsoft.XMLHttp");
	}
	//2.删除目标元素子元素并添加loading图像
	displayAjaxLoading(target);
	//3.把表单的值组织成url编码的字符串，以便通过ajax请求发送
	var dataParts = [];
	var element;
	for(var i = 0; i < whichform.elements.length; i++)
	{
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	//4.创建方法为post的ajax请求，把表单的值发送给submit.html
	request.open('POST', whichform.getAttribute('action'), true);
	//添加头部信息，它表示请求中包含url编码的表单
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onreadystatechange = function()
	{
		if(request.readyState == 4)		//读取完成
		{
			if(request.status == 200)		//读取成功
			{
				//数组matches的第一个元素（索引为0）是responseText中与整个模式匹配的部分，即包括<article>和<\/article>在内的部分
				//因为模式中包含了一个捕获组（一对圆括号），因此matches的第二个元素（索引为1）是responseText中与捕获组中的模式匹配的部分
				//此例中只有一个捕获组，因此matches只包含两个元素
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length > 0)
				{
					target.innerHTML = matches[1];
				}
				else
				{
					target.innerHTML = '<p>出错了</p>';
				}
			}
			else
			{
				target.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}
	}
	request.send(data);
	return true;
}

function prepareForms()
{
	if(!document.getElementsByTagName('form')) return false;
	var forms = document.getElementsByTagName('form');
	for(var i = 0; i < forms.length; i++)
	{
		forms[i].onsubmit = function()
		{
			if(!validateForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			//如果submitFormWithAjax函数成功发送ajax请求并返回true，则让submit事件处理函数返回false，以便阻止浏览器重复提交表单
			//否则，说明没有成功发送ajax请求，因而让submit事件处理函数返回true，让表单像什么都没有发生一样继续通过页面提交
			if(submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}

addLoadEvent(highlightPage);
addLoadEvent(prepareShow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbr);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);




