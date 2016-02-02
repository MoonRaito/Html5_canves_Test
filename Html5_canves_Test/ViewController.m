//
//  ViewController.m
//  Html5_canves_Test
//
//  Created by Moon on 16/1/12.
//  Copyright © 2016年 Moon. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
//    
//    NSString *filePath = [[NSBundle mainBundle]pathForResource:@"main"
//                                                        ofType:@"html"];
//    NSString *htmlString = [NSString stringWithContentsOfFile:filePath
//                                                     encoding:NSUTF8StringEncoding
//                                                        error:nil];
//    [_mainWebView loadHTMLString:htmlString baseURL:[NSURL URLWithString:filePath]];
    NSString * filePath = [[NSBundle mainBundle] pathForResource:@"main"
                                                          ofType:@"html"
                                                     inDirectory:@"html"];
    
    NSString *htmlString = [NSString stringWithContentsOfFile:filePath
                                                     encoding:NSUTF8StringEncoding
                                                        error:nil];
    _mainWebView.scrollView.bounces = NO ;  // 固定
    
    [_mainWebView loadHTMLString:htmlString
                        baseURL:[NSURL URLWithString:filePath]];
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
