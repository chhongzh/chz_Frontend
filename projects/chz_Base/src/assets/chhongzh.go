package main

import (
	"fmt"
	"strings"
	"time"
)

type chhongzh struct{}
type computerInfo struct {
	Brand string
	Model string
	CPU   string
	RAM   string
	SSD   string
	OS    string
	Desc  string
}
type projectInfo struct {
	Name                string
	Desc                string
	IsActiveDevelopment bool
	Link                string
}

var birthday, _ = time.Parse(time.DateOnly, "2011-01-03")

func (chhongzh) Name() string {
	return "chhongzh"
}

func (chhongzh) Birthday() time.Time {
	return birthday
}

func (chhongzh) Age() int {
	return time.Now().Year() - birthday.Year()
}

func (chhongzh) Hobbies() []string {
	return []string{
		"Programming",
		"Gaming",
	}
}

func (chhongzh) ProgrammingLanguagesIUseMost() []string {
	return []string{
		"Golang",
		"Typescript",
	}
}

func (chhongzh) MyComputerInfos() []computerInfo {
	return []computerInfo{
		{Brand: "Apple", Model: "MacBook Pro", CPU: "M2 Pro", RAM: "32GB", SSD: "512GB", OS: "macOS", Desc: "Used for development and daily tasks."},
		{Brand: "Idk (lol)", Model: "Idk, too.", CPU: "Intel Celeron J3455 @ 4x 2.3GHz", RAM: "4GB", SSD: "64GB", OS: "Debian", Desc: "A server deployed at home."},
	}
}

func (chhongzh) MyProjects() []projectInfo {
	return []projectInfo{
		{Name: "chhongzh's homepage", Desc: "Personal homepage showcasing my projects and interests.", IsActiveDevelopment: true, Link: "https://chhongzh.xyz:5777"},
		{Name: "Chz Chat", Desc: "一个简单的聊天网站.", IsActiveDevelopment: true, Link: "https://chat.chhongzh.xyz:5777"},
	}
}

func (c chhongzh) String() string {
	return fmt.Sprintf("Name: %s\nBirthday: %s\nAge: %d\nHobbies: %v\nLanguages: %v\nProjects: %v\nComputer Info: %v",
		chhongzh.Name(c),
		chhongzh.Birthday(c).Format(time.DateOnly),
		chhongzh.Age(c),
		strings.Join(chhongzh.Hobbies(c), ", "),
		strings.Join(chhongzh.ProgrammingLanguagesIUseMost(c), ", "),
		chhongzh.MyProjects(c),
		chhongzh.MyComputerInfos(c),
	)
}

func main() {
	fmt.Println(chhongzh{})
}
